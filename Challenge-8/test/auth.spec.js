const request = require("supertest")
const app = require('../app')
const truncate = require('../helpers/truncate')

// user for testing
const userTest = {
    username: 'klebus22',
    email: 'klebus@gmail.com',
    password: 'klebus123'
}

let token = ''

truncate.user()

describe('/auth/register endpoint', () => {
    // register success
    test('register success and res.json show information of the new user', async () => {
        try {
            const res = await request(app)
                .post('/auth/register')
                .send(userTest)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success')
            expect(res.body.data).toStrictEqual({
                username: userTest.username,
                email: userTest.email
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // register failed because of exist user
    test('register failed res.json send error information', async () => {
        try {
            const res = await request(app)
                .post('/auth/register')
                .send(userTest)

            expect(res.statusCode).toBe(409)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('email already used!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/auth/login endpoint', () => {
    // login success
    test('login successfull res.json send the token', async () => {
        try {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: userTest.email,
                    password: userTest.password
                })

            token = res.body.token

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('token')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('login success!')

        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // login failed username password doesn't match
    test('login failed res.json throw the error message of authentication', async () => {
        try {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: userTest.email,
                    password: `${userTest.password}456`
                })

            expect(res.statusCode).toBe(400)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe("username or password doesn\'t match")

        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/auth/whoami endpoint', () => {
    // whoami success
    test('whoami succes res.json send the user information', async () => {
        try {
            const res = await request(app)
                .get('/auth/whoami')
                .set('Authorization', token)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success')
            expect(res.body.data).toStrictEqual({
                username: userTest.username,
                email: userTest.email
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // whoami failed no token added
    test('whoami failed res.json throw error', async () => {
        try {
            const res = await request(app)
                .get('/auth/whoami')

            expect(res.statusCode).toBe(401)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('you are not authorized!')
            expect(res.body.data).toBe(null)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/auth/change endpoint', () => {
    // change password success
    test('password change successfull send the information of user', async () => {
        try {
            const res = await request(app)
                .post('/auth/change')
                .set('Authorization', token)
                .send({
                    oldPassword: userTest.password,
                    newPassword: userTest.password,
                    confirmNewPassword: userTest.password
                })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success change password!')
            expect(res.body.data).toStrictEqual({
                username: userTest.username,
                email: userTest.email
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // change failed new pass and confirm pass doesn't match
    test("res.json called with {status: false, message: 'new password and confirm new password doesn\'t match!'}", async () => {
        try {
            const res = await request(app)
                .post('/auth/change')
                .set('Authorization', token)
                .send({
                    oldPassword: userTest.password,
                    newPassword: `${userTest.password}45`,
                    confirmNewPassword: `${userTest.password}4`
                })

            expect(res.statusCode).toBe(422)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('new password and confirm new password doesn\'t match!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // change failed old password doesn't match
    test("res.json called with {status: false, message: 'old password doesn\'t match!'}", async () => {
        try {
            const res = await request(app)
                .post('/auth/change')
                .set('Authorization', token)
                .send({
                    oldPassword: `${userTest.password}456`,
                    newPassword: `${userTest.password}4`,
                    confirmNewPassword: `${userTest.password}4`
                })

            expect(res.statusCode).toBe(400)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('old password doesn\'t match!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

module.exports = { userTest, token }



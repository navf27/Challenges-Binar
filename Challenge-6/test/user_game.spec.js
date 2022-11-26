const request = require('supertest')
const app = require('../app')
const authTest = require('./auth.spec.js')

describe('/user/index endpoint', () => {
    // success get user data
    test("get all data of user", async () => {
        try {
            const res = await request(app).get('/user/index')

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success get all data of user!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/user/delete endpoint', () => {
    // delete failed email user not found
    test("delete failed user not found", async () => {
        try {
            const res = await request(app)
                .del('/user/delete')
                .send({
                    email: `${authTest.userTest.email}123`,
                    password: authTest.userTest.password
                })

            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('email or password doesn\'t match!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // delete failed password incorrect
    test("delete failed incorrect password", async () => {
        try {
            const res = await request(app)
                .del('/user/delete')
                .send({
                    email: authTest.userTest.email,
                    password: 'password ngawur'
                })

            expect(res.statusCode).toBe(400)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('email or password doesn\'t match!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })


    // success delete user
    test("success delete user", async () => {
        try {
            const res = await request(app)
                .del('/user/delete')
                .send({
                    email: authTest.userTest.email,
                    password: authTest.userTest.password
                })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success delete user!')
            expect(res.body.data).toStrictEqual({
                username: authTest.userTest.username,
                email: authTest.userTest.email
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})
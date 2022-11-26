const request = require('supertest')
const app = require('../app')
const truncate = require('../helpers/truncate')

const data = {
    username: 'badak_gaming',
    highest_tier: 'platinum',
    highest_points: 3000
}

truncate.user_history()

describe('/user-history/create endpoint', () => {
    // success create data
    test("create data dan show the data", async () => {
        try {
            const res = await request(app)
                .post('/user-history/create')
                .send(data)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('data created!')
            expect(res.body.data).toStrictEqual(data)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // error data already exist
    test("create data failed data already exist", async () => {
        try {
            const res = await request(app)
                .post('/user-history/create')
                .send(data)

            expect(res.statusCode).toBe(409)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('data already exist!')
            expect(res.body.data).toBe(null)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/user-history/index endpoint', () => {
    // success get all data
    test("get all data", async () => {
        try {
            const res = await request(app)
                .get('/user-history/index')

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('success get all data!')
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/user-history/update endpoint', () => {
    // update failed data not found
    test("update failed data not found", async () => {
        try {
            const res = await request(app)
                .put('/user-history/update')
                .send({
                    username: `${data.username}513`,
                    highest_tier: 'diamond',
                    highest_points: 5000
                })

            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('data not found!')
            expect(res.body.data).toBe(null)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // failed data already updated
    test("update failed data already updates", async () => {
        try {
            const res = await request(app)
                .put('/user-history/update')
                .send(data)

            expect(res.statusCode).toBe(409)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('data already updated!')
            expect(res.body.data).toBe(null)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // success update data
    test("success update data", async () => {
        try {
            const res = await request(app)
                .put('/user-history/update')
                .send({
                    username: `${data.username}`,
                    highest_tier: 'diamond',
                    highest_points: 5000
                })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('data updated!')
            expect(res.body.data).toStrictEqual({
                username: `${data.username}`,
                highest_tier: 'diamond',
                highest_points: 5000
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})

describe('/user-history/delete endpoint', () => {
    // failed data not found
    test("delete failed data not found", async () => {
        try {
            const res = await request(app)
                .del('/user-history/delete')
                .send({ username: `${data.username}513` })

            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(false)
            expect(res.body.message).toBe('data not found!')
            expect(res.body.data).toBe(null)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // success delete data
    test("success delete data", async () => {
        try {
            const res = await request(app)
                .del('/user-history/delete')
                .send({ username: data.username })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('data deleted!')
            expect(res.body.data).toStrictEqual({
                username: data.username,
                highest_tier: 'diamond',
                highest_points: 5000
            })
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })
})
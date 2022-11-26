const request = require("supertest")
const app = require('../app')
const truncate = require('../helpers/truncate')

const game_bio = {
    account_name: 'badak_gemink',
    account_level: 'silver'
}

truncate.user_biodata()

describe('/user-bio/create endpoint', () => {
    // success create data
    test("success create data and send information of the data", async () => {
        try {
            const res = await request(app)
                .post('/user-bio/create')
                .send(game_bio)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe('create data success!')
            expect(res.body.data).toStrictEqual(game_bio)
        } catch (err) {
            expect(err).toBe('ewror')
        }
    })

    // create data failed data already exist
    test("create data failed data already exist", async () => {
        try {
            const res = await request(app)
                .post('/user-bio/create')
                .send(game_bio)

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

describe('/user-bio/index endpoint', () => {
    // success get all user-bio data
    test("success get all data", async () => {
        try {
            const res = await request(app).get('/user-bio/index')

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

describe('/user-bio/update endpoint', () => {
    // error data not found
    test("update failed data not found", async () => {
        const res = await request(app)
            .put('/user-bio/update')
            .send({
                account_name: `${game_bio.account_name}5431`,
                account_level: 'gold'
            })

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe('data not found!')
        expect(res.body.data).toBe(null)
    })

    // failed data is already updated
    test("update failed data is already updated", async () => {
        const res = await request(app)
            .put('/user-bio/update')
            .send({
                account_name: game_bio.account_name,
                account_level: game_bio.account_level
            })

        expect(res.statusCode).toBe(409)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe('data already update!')
        expect(res.body.data).toBe(null)
    })

    // update data success
    test("success update data res.json send the information of the data", async () => {
        const res = await request(app)
            .put('/user-bio/update')
            .send({
                account_name: game_bio.account_name,
                account_level: 'gold'
            })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe(true)
        expect(res.body.message).toBe('update success!')
        expect(res.body.data).toStrictEqual({
            account_name: game_bio.account_name,
            account_level: 'gold'
        })
    })
})

describe('/user-bio/delete endpoint', () => {
    // error data not found
    test("delete data failed data not found", async () => {
        const res = await request(app)
            .del('/user-bio/delete')
            .send({ account_name: `${game_bio.account_name}5431` })

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe('data not found!')
        expect(res.body.data).toBe(null)
    })

    // success delete data
    test("success delete data res.json send the information of the data", async () => {
        const res = await request(app)
            .del('/user-bio/delete')
            .send({ account_name: game_bio.account_name })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.status).toBe(true)
        expect(res.body.message).toBe('success delete data!')
        expect(res.body.data).toStrictEqual({
            account_name: game_bio.account_name,
            account_level: 'gold'
        })
    })
})
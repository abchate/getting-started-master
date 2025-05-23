const request = require('supertest');
const app = require('../src/index');
const db = require('../src/persistence'); // ajoute cette ligne

beforeAll(async () => {
    await db.init();
});

afterAll(async () => {
    await db.teardown();
});

describe('GET /items', () => {
    it('should return status 200 and an array', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should match the items snapshot', async () => {
        const res = await request(app).get('/items');
        expect(res.body).toMatchSnapshot();
    });
});

const db = require('../../src/persistence');
const getItems = require('../../src/routes/getItems');
const ITEMS = [{ id: 12345 }];

jest.mock('../../src/persistence', () => ({
    getItems: jest.fn(),
}));

test('it gets items correctly', async () => {
    const req = {};
    const res = { json: jest.fn() }; // correction ici !
    db.getItems.mockReturnValue(Promise.resolve(ITEMS));

    await getItems(req, res);

    expect(db.getItems).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(ITEMS); // plus lisible que l'accès aux calls
});

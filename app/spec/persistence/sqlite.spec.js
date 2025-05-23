const fs = require('fs');
const path = require('path');

// On utilise un chemin local pour la base de tests
const dbTestFile = './tmp/todos/test-database.sqlite';
process.env.DB_PATH = dbTestFile;

let db;

// Avant chaque test, supprime la base et recharge le module à neuf
beforeEach(() => {
    if (fs.existsSync(dbTestFile)) {
        fs.unlinkSync(dbTestFile);
    }
    // Recharge le module à neuf à chaque fois
    delete require.cache[require.resolve('../../src/persistence/sqlite')];
    db = require('../../src/persistence/sqlite');
});

// Nettoie après tous les tests
afterAll(() => {
    if (fs.existsSync(dbTestFile)) {
        fs.unlinkSync(dbTestFile);
    }
});

const ITEM = {
    id: '7aef3d7c-d301-4846-8358-2a91ec9d6be3',
    name: 'Test',
    completed: false,
};

test('it initializes correctly', async () => {
    await db.init();
});

test('it can store and retrieve items', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(ITEM);
});

test('it can update an existing item', async () => {
    await db.init();

    const initialItems = await db.getItems();
    expect(initialItems.length).toBe(0);

    await db.storeItem(ITEM);

    await db.updateItem(
        ITEM.id,
        Object.assign({}, ITEM, { completed: !ITEM.completed }),
    );

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0].completed).toBe(!ITEM.completed);
});

test('it can remove an existing item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    await db.removeItem(ITEM.id);

    const items = await db.getItems();
    expect(items.length).toBe(0);
});

test('it can get a single item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const item = await db.getItem(ITEM.id);
    expect(item).toEqual(ITEM);
});

const db = require('../persistence');

module.exports = async function (req, res) {
    const items = await db.getItems();
    res.json(items);
}
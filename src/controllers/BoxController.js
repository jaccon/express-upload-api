const Box = require('../models/Box');

class BoxController {
    async store(req, rest) {
        const box = await Box.create({ title: 'Rocket'});
        return res.json(box);
    }
}

module.exports = new BoxController();

import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        res.json(await DB.States.oneState("AL"));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/all', async (req, res) => {
    try {
        res.json(await DB.States.allStates());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
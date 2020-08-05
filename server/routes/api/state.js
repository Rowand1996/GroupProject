import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        res.json(await DB.States.oneState(id));
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
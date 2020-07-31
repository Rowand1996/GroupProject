import * as express from 'express';

import DB from '../../db';

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if(!req.user || req.user.role !== 'guest') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

router.get( '/:id?', async (req, res,) => {
    try {
        let id = parseInt(req.params.id);
        if (id) {
            res.json(await DB.Users.findOneUserById(id));
        }
        else {
            res.json(await DB.Users.allUsers());
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
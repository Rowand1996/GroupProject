import * as express from 'express';
import * as passport from 'passport';

import usersRouter from './users';
import stateRouter from './state';

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/users', usersRouter);
router.use('/state', stateRouter);

export default router;
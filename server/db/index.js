import * as mysql from 'mysql';
import config from '../config';
import Users from './querys/users';
import AccessTokens from './querys/accesstokens';

export const pool = mysql.createPool(config.mysql);


export const Query = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


export default {
    Users,
    AccessTokens
}
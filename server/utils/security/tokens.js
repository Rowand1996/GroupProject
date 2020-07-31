import * as crypto from 'crypto';
import * as jsonWebToken from 'jsonwebtoken';
import config from '../../config';
import DB from '../../db';

export const CreateToken = async (payload) => {
    let tokenid = await DB.AccessTokens.insert(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jsonWebToken.sign(payload.accesstokenid, config.auth.secret);
    await DB.AccessTokens.update(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token) => {
    let payload = jsonWebToken.decode(token);
    // console.log(payload);
    let [accesstokenid] = await DB.AccessTokens.findOne(payload.accesstokenid, token);
    console.log(accesstokenid);
    if(!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return accesstokenid;
        // return payload; 
    }
};

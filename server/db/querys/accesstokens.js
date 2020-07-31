import { Query } from '../index';


const findOne = async (id,token) => Query('SELECT * FROM tokens WHERE id = ? AND token = ?',[id,token]);

const insert = async (userid) => Query('INSERT INTO tokens (userid) VALUES (?)',[userid]);

const update = async (id,token) => Query('UPDATE tokens SET token = ? WHERE id = ?',[id,token]);


export default {
    findOne,
    insert,
    update
}
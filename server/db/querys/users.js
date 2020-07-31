import { Query } from '../index';

const findOneUserById = async (id) => Query('SELECT * FROM users WHERE id = ?',[id]);

const findOneByEmail = async (email) => Query('SELECT * FROM users WHERE email = ? LIMIT 1',[email]);

const allUsers = async () => Query('SELECT * FROM users');

const insert = async (name, email, password, role, zipcode, location) => Query('INSERT INTO users (name, email, password, role, zipcode, location) VALUES (?,?,?,?,?,?)', [name,email,password,role,zipcode,location]);

export default {
    findOneUserById,
    findOneByEmail,
    allUsers,
    insert
}
import * as bcrypt from 'bcrypt';

export const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const ComparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}; 
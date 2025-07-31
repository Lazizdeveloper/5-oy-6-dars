import bcrypt from 'bcrypt';

export const HashService = {
  hashPassword: async (password) => await bcrypt.hash(password, 10),
  comparePasswords: async (password, hashPassword) => await bcrypt.compare(password, hashPassword)
};
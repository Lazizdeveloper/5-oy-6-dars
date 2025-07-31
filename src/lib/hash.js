import bcrypt from 'bcrypt';

export const HashService = {
  hashPassword: async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  },
  comparePasswords: async (password, hashPassword) => {
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      throw new Error('Error comparing passwords: ' + error.message);
    }
  },
};
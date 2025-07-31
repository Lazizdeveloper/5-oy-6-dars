import jwt from 'jsonwebtoken';
import { serverConfig } from '../config.js';

export const JwtService = {
  generateToken: (payload) => {
    try {
      return jwt.sign(payload, serverConfig.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
      throw new Error('Error generating token: ' + error.message);
    }
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, serverConfig.JWT_SECRET);
    } catch (error) {
      throw new Error('Error verifying token: ' + error.message);
    }
  },
};
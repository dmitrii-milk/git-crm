import * as crypto from 'crypto';
import configFunc from '../config';
const config = configFunc();

export const hashPassword = (password: string) =>
  new Promise<string>((resolve, reject) => {
    const salt = crypto.randomBytes(config.auth.hash.salt).toString('base64');

    crypto.scrypt(password, salt, config.auth.hash.keyLength, (err, result) => {
      if (err) reject(err);

      const hash = salt + ':' + result.toString('base64');
      resolve(hash);
    });
  });

export const comparePasswordHash = (password: string, hash?: string) =>
  new Promise<boolean>((resolve, reject) => {
    if (!hash) {
      resolve(false);
      return;
    }

    const [salt, hashedPassword] = hash.split(':');

    crypto.scrypt(password, salt, config.auth.hash.keyLength, (err, result) => {
      if (err) reject(err);

      const newHash = salt + ':' + result.toString('base64');

      resolve(newHash === hash);
    });
  });

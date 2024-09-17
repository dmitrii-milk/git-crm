import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  github: {
    apiUrl: process.env.GITHUB_API_URL,
  },
  auth: {
    jwt: {
      secret: new TextEncoder().encode(process.env.JWT_SECRET),
      algorithm: process.env.JWT_ALG,
      sessionDuration: parseInt(process.env.JWT_SESSION_DURATION, 10),
    },
    hash: {
      salt: parseInt(process.env.HASH_SALT_LENGTH, 10),
      keyLength: parseInt(process.env.HASH_KEY_LENGTH, 10),
    },
  },
});

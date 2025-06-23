import auth from './auth';
import database from './database';

const config = () => {
  return {
    auth: auth(),
    database: database(),
  };
};

export type AppConfig = ReturnType<typeof config>;

export default config;

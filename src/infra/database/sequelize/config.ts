import dotenv from 'dotenv'

dotenv.config()

const {
  DB_DIALECT_TEST,
  DB_HOST_TEST,
  DB_PORT_TEST,
  DB_DATABASE_TEST,
  DB_USERNAME_TEST,
  DB_PASSWORD_TEST,
  DB_DIALECT_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_DATABASE_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  DB_DIALECT_PROD,
  DB_HOST_PROD,
  DB_PORT_PROD,
  DB_DATABASE_PROD,
  DB_USERNAME_PROD,
  DB_PASSWORD_PROD
} = process.env

export = {
  development: {
    dialect: DB_DIALECT_TEST,
    host: DB_HOST_DEV,
    port: DB_PORT_DEV,
    username: DB_USERNAME_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_DATABASE_DEV
  },
  test: {
    dialect: DB_DIALECT_DEV,
    host: DB_HOST_TEST,
    port: DB_PORT_TEST,
    username: DB_USERNAME_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_DATABASE_TEST
  },
  production: {
    dialect: DB_DIALECT_PROD,
    host: DB_HOST_PROD,
    port: DB_PORT_PROD,
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_DATABASE_PROD
  }
}

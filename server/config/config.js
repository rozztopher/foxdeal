const path = require('path')
require('dotenv').config({path:path.resolve(__dirname , '../.env/')})
module.exports = {
  "development": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASS_WORD,
    "database": "fox_deal_development",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "logging": true
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

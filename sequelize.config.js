/** @type {import('sequelize').Options} */
const config = {
  development: {
    username: "postgres",
    password: "611611",
    database: "postgresTS",
    host: "127.0.0.1",
    dialect: "postgres",
    schema: "cardealership",
  },
};

module.exports = config;

const Sequelize = require("sequelize");
const Pool = require("pg").Pool;

const PG_DATABASE = "movies";
const PG_DATABASE_USERNAME = "moviefan";
const PG_DATABASE_PASSWORD = "scarymovie";
const PG_HOST = "localhost";

const sequelize = new Sequelize(
  PG_DATABASE,
  PG_DATABASE_USERNAME,
  PG_DATABASE_PASSWORD,
  {
    host: PG_HOST,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSql Database is Connected");
  } catch (error) {
    console.log(
      "Error while establish connection with PostgreSql Database" + error
    );
    process.exit(1);
  }
};

const pool = new Pool({
  user: "moviefan",
  host: "localhost",
  database: "movies",
  password: "scarymovie",
  port: 5432,
});

module.exports = { sequelize, connectDb, pool };

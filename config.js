// must restart server whenever you make changes in next.config
const dotenv = require("dotenv");
const config = require("./config");
dotenv.config();
module.exports = {
  MONGO_SRV: process.env.MONGO_SRV || config.MONGO_SRV,
  JWT_SECRET: process.env.JWT_SECRET || config.JWT_SECRET,
};

const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ADMIN_BRO_TMP_DIR } = require("admin-bro");
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
});

const ADMIN = {
  email: "rk1@gmail.com",
  password: "super1",
};
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    try {
      // 1.check if user exist in db
      const user = await User.findOne({ email }).select("+password");

      // 2. if not exist return error
      if (!user) {
        return null;
      }

      // 3. check to see if users password matches in db
      const passwordsMatch = await bcrypt.compare(password, user.password);

      // 4.if so generate a token
      if (passwordsMatch && user.role === "admin") {
        return ADMIN;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error logging in user");
    }
    return null;
  },
  cookieName: "adminbro",
  cookiePassword: "supercell",
});

module.exports = router;

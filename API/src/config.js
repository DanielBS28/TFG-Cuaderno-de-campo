require("dotenv").config();

module.exports = {
  app: {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
  },
  email: {
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASS,
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
  },
};

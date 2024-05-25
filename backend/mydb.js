const mongoose = require("mongoose");
const connectionString = require("./secrets/DBsecret");
const m_db = async () => {
  await mongoose.connect(
    connectionString,
    { useNewUrlParser: true },
    async (err, res) => {
      if (err) {
        throw err;
      }
    }
  );
};
module.exports = m_db;

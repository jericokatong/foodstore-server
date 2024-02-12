const mongoose = require("mongoose");

const { dbHost, dbName, dbPort, dbUser, dbPass } = require("../config");

mongoose
  .connect(
    `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
  )
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

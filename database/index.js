const mongoose = require("mongoose");

const { dbHost, dbName, dbPort, dbUser, dbPass } = require("../config");

// mongoose
//   .connect(
//     `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
//   )
//   .then(() => console.log("Connected to database"))
//   .catch((error) => console.log(error));

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.qftwgl1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

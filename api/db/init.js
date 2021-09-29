const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => {
            console.log("connected to db");
        })
        .catch((err) => {
            console.error("cannot connect to db", err);
        });
};

module.exports = dbConnect;

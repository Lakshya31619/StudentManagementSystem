const express = require('express');
const { connectDB } = require("./database/conectionDB.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/student.js');

connectDB("mongodb://127.0.0.1:27017/StudentDB").then(() => {
    console.log("Connected to database");
});

app.use("/api/student", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
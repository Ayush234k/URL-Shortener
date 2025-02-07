const express = require("express");
const { connectMongoDB } = require("./connections")
const urlRouter = require("./routes/urlRoutes")

const app = express();
const PORT = 3001;

app.use(express.json());

connectMongoDB("mongodb://127.0.0.1:27017/URL-Shortener")
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Error connecting database, ERROR : ", err);
})

app.use("/url", urlRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
})
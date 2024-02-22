import express, { json }  from "express";
import connectDB from "./database/database.js";

const app = express();
const port = process.env.PORT | 9999;

app.use(json())


app.get('/', (req, resp) => {
    resp.send("Hello World");
})

app.listen(port, async() => {
    connectDB;
    console.log(`Server is running on: http://localhost:${port}`);
})



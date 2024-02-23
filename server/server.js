import express, { json }  from "express";
import connectDB from "./database/database.js";
import {productRouter} from './routes/index.js'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = process.env.PORT ;

console.log(port,"prt")

app.use(json())

app.use('/product', productRouter);

app.get('/', (req, resp) => {
    resp.send("Hello World");
})

app.listen(port, async() => {
    await connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
})



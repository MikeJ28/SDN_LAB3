import express, { json }  from "express";
import connectDB from "./database/database.js";
import {productRouter, categoryRoute} from './routes/index.js';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Import cors middleware

dotenv.config()
const app = express();
const port = process.env.PORT ;

app.use(json());

// Sử dụng cors middleware
app.use(cors());

app.use('/category', categoryRoute);
app.use('/products', productRouter);

app.get('/', (req, resp) => {
    resp.send("Hello World");
})

app.listen(port, async() => {
    await connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
})



import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express()

// Middleware for parsing request body.
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my BOOK Store')
})

// Middleware for handling CORS Policy (Security for web commuinication)
// We can use it in two ways:
// Option 1: Allow All origins with default of cors(*)
// Like this we have default cors of star that allows eveything.
//app.use(cors());

// Option 2: Allowing custom origins. that way we can have a better control
// For this we can use an object in cors
app.use(
    cors({
        origin: 'http://localhost:3000', // allowing communication with localhost
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing only this method calls 
        allowedHeaders: ['Content-Type'], // Headers we allowing to recieve;
    })
);



app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
     })
    .catch((error) => {
        console.log(error);
    });
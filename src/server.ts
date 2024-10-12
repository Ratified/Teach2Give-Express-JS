import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { getXataClient } from './xata';

const app = express();
const PORT = 5000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware
dotenv.config();
const xata = getXataClient();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the user route
app.use('/api/users', require('./routes/user.route'));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
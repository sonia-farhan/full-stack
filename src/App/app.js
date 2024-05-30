import express from 'express'
import authRouter from '../routers/authRouter.js';
import categoryRouter from '../routers/categoryRouter.js';
import productRouter from '../routers/producRouter.js';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import path from 'path'
 import { fileURLToPath } from 'url';

const app=express();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);



// const corsOptions = {
//     origin: 'anmol-d5ww.vercel.app', 
//     methods: ['GET', 'POST'], 
//     credentials: true, 
//   };

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static("public"))

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

//routing.......
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/product',productRouter);

const buildPath = path.resolve(__dirname, '../../frontend/build'); // Adjusted path
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
});


export default app
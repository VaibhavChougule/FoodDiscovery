import express from 'express'
import cors from 'cors'
import dbConnect from './db/DBprovider.js';

import {router as homeRoute}  from './routes/home.js';
import {router as registerRestoRoute}  from './routes/registerResto.js';
import {router as AdminLogin}  from './routes/AdminLogin.js';
import {router as verifyAdmin} from './routes/verifyAdmin.js'
import {router as RestoLogin} from './routes/RestoLogin.js'
import { router as acceptResto } from './routes/verifyResto.js';



const app = express();

app.use(cors())
app.use(express.json())

app.use('/' , homeRoute);

app.use('/' , registerRestoRoute);
app.use('/' , AdminLogin)
app.use('/' , verifyAdmin )
app.use('/' , RestoLogin)
app.use('/' , acceptResto)


dbConnect()
.then(()=>{
    console.log("connection success")
})
.catch((err) =>{
    console.log('error while conn. with database' , err)
})

app.listen(3009 , ()=>{
    console.log("app is listening")
})


export default app;
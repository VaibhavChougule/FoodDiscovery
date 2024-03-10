import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './db/DBprovider.js';

import {router as homeRoute}  from './routes/home.js';
import {router as registerRestoRoute}  from './routes/registerResto.js';
import {router as AdminLogin}  from './routes/AdminLogin.js';
import {router as verifyAdmin} from './routes/verifyAdmin.js'
import {router as RestoLogin} from './routes/RestoLogin.js'
import { router as acceptResto } from './routes/verifyResto.js';
import {router as menuCard} from './routes/menuCard.js'

import {router as seeCookie} from './routes/seeOwner.js'





const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/' , homeRoute);

app.use('/' , registerRestoRoute);
app.use('/' , AdminLogin)
app.use('/' , verifyAdmin )
app.use('/' , RestoLogin)
app.use('/' , acceptResto)

app.use('/' , seeCookie)
app.use('/' , menuCard)


dbConnect()
.then(()=>{
    console.log(" database connection success")
    app.listen(3009 , ()=>{
    console.log("app is listening")
})
})
.catch((err) =>{
    console.log('error while conn. with database' , err)
})




export default app;
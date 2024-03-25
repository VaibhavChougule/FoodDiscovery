import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnect from './db/DBprovider.js';

import {router as homeRoute}  from './routes/home.js';
import {router as demoRoute}  from './routes/demo.js';
import {router as registerRestoRoute}  from './routes/registerResto.js';
import {router as AdminLogin}  from './routes/AdminLogin.js';
import {router as verifyAdmin} from './routes/verifyAdmin.js'
import {router as RestoLogin} from './routes/RestoLogin.js'
import { router as acceptResto } from './routes/verifyResto.js';
import {router as menuCard} from './routes/menuCard.js'
import {router as getResto} from './routes/getResto.js'

import {router as seeCookie} from './routes/seeOwner.js'

const app = express();


const allowedIPs = ['::ffff:127.0.0.1'];

// IP Whitelisting Middleware
const ipWhitelistMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  console.log(req.ip);

  if (allowedIPs.includes(clientIP)) {
    // Allow the request to proceed to the next middleware or route
    next();
  } else {
    console.log("not valid ip addr");
    // Deny access for non-whitelisted IP addresses
    res.status(403).send('Forbidden - Your IP address is not allowed.');
  }
};

// Apply the IP whitelisting middleware to all routes or specific routes
//app.use(ipWhitelistMiddleware);




app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/' , getResto)
app.use('/' , AdminLogin)
app.use('/' , homeRoute);
app.use('/' , demoRoute)

app.use('/' , registerRestoRoute);
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
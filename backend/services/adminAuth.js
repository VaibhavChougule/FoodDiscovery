import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

async function setAdmin(username){
    const token = await jwt.sign({username:username} , process.env.JWT_KEY);
    return token;
}

let id ;

function getAdmin(token){
    console.log("token into verification",token)
    if(token == null){
        return false
    }
    //let status = false;
    const t = jwt.verify(token , process.env.JWT_KEY , (err , decodedToken)=>{
        if(err){
            console.log("error while verifying token" , err)
           return false
        }
        else{
            console.log("token verified")
            console.log("user info", decodedToken.username)
            id = decodedToken.username;
            return true
            //status = true;
        }
    })
    console.log("getAdmin status ",t)
    return t;
}

export {setAdmin , getAdmin , id}
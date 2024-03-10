import jwt from "jsonwebtoken";


async function verifyOwner(token){
    const vstatus = await jwt.verify(token , process.env.JWT_KEY , (err , decodedToken) =>{
        if(err){
            console.log("errror while verifying owner" , err);
            return {st:false , message:false};
        }
        else{
            console.log("verification success");
            return {st:true , message:decodedToken.username}
        }
    })
    return vstatus;
}

export {verifyOwner}
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

//* GIVEN THE USER ID, GIVES BACK THE ACCESS TOKEN
export const JWTAuthenticate=async(user)=>{
    const accessToken=await generateJWT({_id:user._id})
    return accessToken
}
//! NO CURLY BRACKETS HERE !!!
const generateJWT=(payload)=>
    new Promise((resolve,reject)=>
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'10h'},
            (err,token)=>{
                if(err) reject(err)
                else resolve(token)
            }
        )
    )


//* VERIFY TOKEN
//! NO CURLY BRACKETS HERE !!!
export const verifyJWT=(token)=>
    new Promise((resolve,reject)=>
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err,decodedToken)=>{
                if(err) reject(err)
                else resolve(decodedToken)
            }
        )
    )

    
//* VERITY IF HOST
export const hostMiddleware=(req,res,next)=>{
    if(req.user.role==='host'){
        next()
    }else{
        next(createHttpError(403,'Allowed only to hosts.'))
    }
}
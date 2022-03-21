import jwt from 'jsonwebtoken'

//* GIVEN THE USER ID, GIVES BACK THE ACCESS TOKEN
export const JWTAuthenticate=async(user)=>{
    const accessToken=await generateJWT({_id:user._id})
    return accessToken
}
const generateJWT=(payload)=>{
    new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'10h'},
            (err,token)=>{
                if(err) reject(err)
                else resolve(token)
            }
        )
    })
}

//* VERIFY TOKEN
export const verifyJWT=(token)=>{
    new Promise((resolve,reject)=>{
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err,decodedToken)=>{
                if(err) reject(err)
                else resolve(decodedToken)
            }
        )
    })
}
import createHttpError from 'http-errors'
import atob from 'atob'
import UserModel from '../services/users/schema.js'

export const basicAuthMiddleware=async(req,res,next)=>{
    //* IT IS RECEIVING CREDENTIALS? CHECK IT!
    if(!req.headers.authorization){
        next(createHttpError(401,'Please provide credentials in Auth header.'))
    }else{
        const decodedCredentials=atob(req.headers.authorization.split(' ')[1])
        const[email,pw]=decodedCredentials.split(':')
        console.log('EMAIL',email)
        console.log('PW',pw)
        const user=await UserModel.checkCredentials(email,pw)
        if(user){
            req.user=user //! ATTACHING THE USER DOCUMENT TO THE REQUEST
            next()
        }else{
            next(createHttpError(401,'Please provide correct credentials.'))
        }
    }
}
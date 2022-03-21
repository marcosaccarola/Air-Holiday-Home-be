import createHttpError from 'http-errors'
import UserModel from '../services/users/schema.js'
import { verifyJWT } from './tools.js'

export const JWTAuthMiddleware=async(req,res,next)=>{
    //* IS IT RECEIVING CREDENTIALS?
    if(!req.headers.authorization){
        next(createHttpError(401,'Please provide credentials in Auth header.'))
    }else{
        //* IF YES, EXTRACTS TOKEN FROM THE HEADER
        try {
            const token=req.headers.authorization.replace('Bearer ','')
            //* VERIFY TOKEN
            const decodedToken=await verifyJWT(token)
            //* FIND USER IN DB
            const user=await UserModel.findById(decodedToken._id)
            if(user){
                req.user=user //! ATTACHING THE USER DOCUMENT TO THE REQUEST
                next()
            }else{
                next(createHttpError(404,'User not found.'))
            }
        } catch (error) {
            next(createHttpError(403,'Forbidden.'))
        }
    }
}

export const hostMiddleware=(req,res,next)=>{
    if(req.user.role==='host'){
        next()
    }else{
        next(createHttpError(403,'Allowed only to hosts.'))
    }
}
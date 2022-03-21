import express from 'express'
import UserModel from '../users/schema.js'
import AccommodationModel from '../accommodations/schema.js'
import { JWTAuthenticate } from '../../auth/tools.js'
import { JWTAuthMiddleware } from '../../auth/token.js'
import createHttpError from 'http-errors'

const userRouter=express.Router()

userRouter
.post('/register',async(req,res,next)=>{
    try {
        const newUser=new UserModel(req.body)
        const{_id}=await newUser.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
.post('/login',async(req,res,next)=>{
    try {
        const{email,pw}=req.body
        const user=await UserModel.checkCredentials(email,pw)
        if(user){
            console.log('user', user)
            const accessToken=await JWTAuthenticate(user)
            console.log('accessToken', accessToken)
            res.send(accessToken)
        }else{
            next(createHttpError(401,'Credentials are uncorrect.'))
        }
    } catch (error) {
        next(error)
    }
})
.get('/me',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})
.put('/me',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const user=await UserModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
        if(user){
            res.send(user)
        }else{
            next(createHttpError(404,`User id ${req.body._id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})
.get('/me/accommodation',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const accommodation=await AccommodationModel.find({host:req.user._id.toString()})
        res.send(accommodation)
    } catch (error) {
        next(error)
    }
})

export default userRouter
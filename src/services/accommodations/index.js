import express from 'express'
import mongoose from 'mongoose'
import AccommodationModel from './schema.js'
import UserModel from '../users/schema.js'
import { JWTAuthMiddleware } from '../../auth/token.js'
import { hostMiddleware } from '../../auth/tools.js'
import createHttpError from 'http-errors'

const accommodationRouter=express.Router()

accommodationRouter
.get('/',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const accommodation=await AccommodationModel.find().populate('host')
        res.send(accommodation)
    } catch (error) {
        next(error)
    }
})
.post('/',JWTAuthMiddleware,hostMiddleware,async(req,res,next)=>{
    try {
        const newAccommodation=new AccommodationModel(req.body)
        const{_id}=await newAccommodation.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
.get('/:id',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const accommodation=await AccommodationModel.findById(req.params.id).populate('host')
        if(accommodation!==null){
            res.send(accommodation)
        }else{
            res.status(404).send('Accommodation not found.')
        }
    } catch (error) {
        next(error)
    }
})
.put('/:id',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const modifiedAccommodation=await AccommodationModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(modifiedAccommodation){
            res.send({modifiedAccommodation})
        }else{
            next(createHttpError(404,`Accommodation id ${req.params.id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})
.delete('/:id',JWTAuthMiddleware,async(req,res,next)=>{
    try {
        const deletedAccommodation=await AccommodationModel.findByIdAndDelete(req.params.id)
        if(deletedAccommodation){
            res.send(`No more accommodation id ${req.params.id}.`)
        }else{
            next(createHttpError(404,`Accommodation id ${req.params.id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

export default accommodationRouter
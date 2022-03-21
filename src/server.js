import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import userRouter from './services/users/index.js'

const server=express()
const port=process.env.PORT||3001

// ****************************** MIDDLEWARES
server.use(cors())
server.use(express.json())

// ****************************** ROUTES
server.use('/user',userRouter)

// ****************************** CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on('connected',()=>{
    console.log('CONNECTED TO MONGO DB')
    server.listen(port,()=>{
        console.table(listEndpoints(server))
        console.log(`SERVER RUNNING ON PORT ${port}`)
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})



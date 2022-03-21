import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import userRouter from './services/users/index.js'
import accommodationRouter from './services/accommodations/index.js'
import{
    notFoundHandler,
    forbiddenHandler,
    badRequestHandler,
    genericErrorHandler
} from './errorHandlers.js'

const server=express()
const port=process.env.PORT||3001

// ****************************** MIDDLEWARES
server.use(cors())
server.use(express.json())

// ****************************** ROUTES
server.get('/',async(req,res,next)=>{
    try {
        res.send('Server is running.')
    } catch (error) {
        next(error)
    }
})
server.use('/user',userRouter)
server.use('/accommodation',accommodationRouter)

// ****************************** ERROR HANDLERS
server.use(notFoundHandler)
server.use(forbiddenHandler)
server.use(badRequestHandler)
server.use(genericErrorHandler)

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



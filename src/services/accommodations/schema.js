import mongoose from 'mongoose'

const{Schema,model}=mongoose

const accommodationSchema=new Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        maxGuestsNumber:{type:String,required:true},
        location:{type:String,required:true},
        host:{type:Schema.objectId ,ref:'user'},
    },
    {timestamps:true}
)

export default model('accommodation',accommodationSchema)
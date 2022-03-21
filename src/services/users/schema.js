import mongoose from 'mongoose'

const{Schema,model}=mongoose

const userSchema=new Schema(
    {
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        email:{type:String,required:true},
        pw:{type:String,required:true},
        role:{type:String,default:'guest',enum:['guest','host']},
    },
    {timestamps:true}
)

export default model('user',userSchema)
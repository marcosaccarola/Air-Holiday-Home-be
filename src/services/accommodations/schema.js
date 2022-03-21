import mongoose from 'mongoose'

const{Schema,model}=mongoose

const accommodationSchema=new Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        maxGuestsNumber:{type:Number,required:true},
        location:{type:String,required:true},
        host:{type:Schema.ObjectId ,ref:'user'}
    },
    {timestamps:true}
)

//* HIDDING SOME OBJECT VALUES
accommodationSchema.methods.toJSON=function(){
    const accommodationDocument=this
    const accommodationObject=accommodationDocument.toObject()
    delete accommodationObject.__v
    delete accommodationObject.createdAt
    delete accommodationObject.updatedAt
    return accommodationObject
}

export default model('accommodation',accommodationSchema)
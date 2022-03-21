import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

//* HASHING PW, BEFORE SAVING IN DB
userSchema.pre('save',async function(next){
    const newUser=this // THIS refers to the current user
    const plainPW=newUser.pw
    //* IT HASH ONLY IF USER IS MODIFYING PW VALUE
    if(newUser.isModified('pw')){
        newUser.pw=await bcrypt.hash(plainPW,10)
    }
    next()
})

//* CHECKING CREDENTIALS
userSchema.statics.checkCredentials=async function(email,plainPW){
    const user=await this.findOne({email}) // THIS refers to the userModel
    if(user){
        const isMatch=await bcrypt.compare(plainPW,user.pw)
        if(isMatch) return user
        else return null // if pw not matched
    } else return null // if user not found
}

//* HIDDING SOME OBJECT VALUES
userSchema.methods.toJSON=function(){
    const userDocument=this
    const userObject=userDocument.toObject()
    delete userObject.pw
    delete userObject.__v
    delete userObject.createdAt
    delete userObject.updatedAt
}

export default model('user',userSchema)
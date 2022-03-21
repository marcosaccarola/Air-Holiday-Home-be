export const notFoundHandler=(err,req,res,next)=>{
    if(err.status===404){
        res.status(err.status).send({message:err.message||'Not found.'})
    }else{
        next(err)
    }
}
export const forbiddenHandler=(err,req,res,next)=>{
    if(err.status===403){
        res.status(err.status).send({message:err.message||'Forbidden.'})
    }else{
        next(err)
    }
}
export const badRequestHandler=(err,req,res,next)=>{
    if(err.status===400){
        res.status(err.status).send({message:err.message||'Bad request.'})
    }else{
        next(err)
    }
}
export const genericErrorHandler=(err,req,res,next)=>{
    console.log(err)
    res.status(500).send({message:'Generic server error.'})
}
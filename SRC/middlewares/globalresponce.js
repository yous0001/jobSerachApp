export const globalresponce=(err,req,res,next)=>{
    if(err){
        return res.status(500).json({
            errormessage:err.message,
            errorlocation:err.stack
        })
    }

}
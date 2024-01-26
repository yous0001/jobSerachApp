

const reqkeys=['body','query','params','headers']
//we will loop in all reqkeys to validate any posible way to get data in any api
export const validation=(schema)=>{
    return (req,res,next)=>{
        const validationerrors=[]
        for(const key of reqkeys){
            const validresult=schema[key]?.validate(req[key],{abortEarly:false})
            //validresult is the result of validation by schema which in the module
            /*we make abortEarly false to return all errors and check all data if you want to return res after first error you can 
            make it true or remove it because it's true by default*/
            //if it return error we will return res to user and that will terminate it before start in controller 
            if(validresult?.error){
                validationerrors.push(validresult.error.details)
                
            }
        }
        if(validationerrors.length){
            return res.json({
                errors:validationerrors
                //we can map on it and take only messages but i prefer to send all of details
                //but make sure to spread the details to make it 1d array and can map on it
            })
        }
        //to continue to controller
        next()

    }
}


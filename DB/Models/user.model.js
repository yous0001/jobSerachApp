import { Schema, model } from "mongoose";


const userschema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    recoveryEmail:{
        type:String,
        required:true
    },
    DOB:String,
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['user','company_HR'],
        default:"user"
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:"offline"
    }


},{timestamps:true})


//mon will make it users
const User=model('User',userschema)
export default User;
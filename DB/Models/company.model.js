import mongoose, { Schema, model } from "mongoose";

const companyschema=new Schema({
    companyname:{
        type:String,
        required:true,
        unique:true
    },

    description:String,

    industry:{
        type:String,
        required:true
    },
    
    address:String,
    numberOfEmployee:{
        type:Number,
        min:11,
        max:20
    },

    companyEmail:{
        type:String,
        required:true,
        unique:true
    },

    companyHr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }
},{timestamps:true})

const Company= model('company',companyschema)

export default Company;
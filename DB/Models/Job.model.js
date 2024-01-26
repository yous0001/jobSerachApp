import mongoose, { Schema } from "mongoose";

const jobschema=new Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    workingtime:{
        type:String,
        required:true
    },
    seniorylevel:{
        type:String,
        enum:['Junior','Mid-Level','Senior','Team-Lead','CTO'],
        required:true
    },
    technicalSkills:{
        type:Array,
        required:true
    },
    softSkills:{
        type:Array,
        required:true
    },
    description:String,
    addBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

const Job=mongoose.model('job',jobschema)

export default Job;
import mongoose from "mongoose";

const db_connection=()=>{
    mongoose.connect(process.env.connectionURLLocal)
    .then((res)=>console.log("db connected succefully"))
    .catch((err)=>console.log("db connected failed"))
}

export default db_connection;
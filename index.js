import  express from "express"
import userRouter from "./SRC/Modules/user/user.routes.js"
import companyRouter from "./SRC/Modules/company/company.routes.js"
import jobRouter from "./SRC/Modules/Job/job.routes.js"
import db_connection from "./DB/connection.js"
import { config } from "dotenv"
import { globalresponce } from "./SRC/middlewares/globalresponce.js"

config({path:'./config/.env'})
// init new express app
const app=express()
app.use(express.json())
app.use('/user',userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter)

app.use(globalresponce)
db_connection()
//turn on the app on port 3000
app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`);
})
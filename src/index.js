// this is main file of server
// we have distributed overhead in model files
// and finall use that router in this file

const express =require('express')
require('./db/Mongoose.js')
const app=express()
// the data coming in the request is parsed as json
app.use(express.json())

//uptill now we have used app.use() for registering default function or router
// but we can use this to set middle ware

// request ----> middleware -----> router

// app.use((req,res,next)=>
// {
// if(req.method=='GET')
//       res.send('GET requests are blocked')

//       next()
// })



// we are importing the router from each file
const user_router =require('./routes/user_routes.js')
const task_router=require('./routes/task_router.js')

// by this comnd it will use that router
app.use(user_router)
app.use(task_router)



app.listen(3000,()=>
{
    console.log('listning no port 3000')
})
const bcrypt= require('bcryptjs')

const myFun =async()=>
{
    const pass='12345'
    const hashPass =await bcrypt.hash(pass,8)

    console.log(pass)
    console.log(hashPass)

}


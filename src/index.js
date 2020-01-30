// this is main file of server
// we have distributed overhead in model files
// and finall use that router in this file

const express =require('express')
require('./db/Mongoose.js')
const app=express()
// the data coming in the request is parsed as json
app.use(express.json())



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



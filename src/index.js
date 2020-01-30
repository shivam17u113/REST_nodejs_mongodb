const express =require('express')
require('./db/Mongoose.js')

// the database moedule is loaded which is used to create object and store in db
const User =require('./models/user.js')
const Task=require('./models/task.js')

const app=express()

// the data coming in the request is parsed as json
app.use(express.json())

app.listen(3000,()=>
{
    console.log('listning no port 3000')
})

// this is post request user /user url
app.post('/user',(req,res)=>
{
console.log(req.body)

// object for user created now it will be stored into database
var user =new User(req.body)

        user.save().then(()=>
        {
        res.send('user registered successfully')
        }).catch((e)=>
        {
        res.send(e)
        })

})

// post request to send data under url /task
app.post('/task',(req,res)=>
{
    var task=new Task(req.body)

console.log(task)
    task.save().then(()=>
        {
        res.send('task saved successfully')
        }).catch((e)=>
        {
        res.send(e)
        })

})
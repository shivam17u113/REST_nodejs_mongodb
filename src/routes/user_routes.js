const express =require('express')
const User =require('../models/user.js')
const router = new express.Router()


router.post('/user',(req,res)=>
{
console.log(req.body)

// object for user created now it will be stored into database
var user =new User(req.body)

        user.save().then(()=>
        {
        res.send('user registered successfully')
        }).catch((e)=>
        {
        res.status(400).send(e)
        })

})

module.exports= router
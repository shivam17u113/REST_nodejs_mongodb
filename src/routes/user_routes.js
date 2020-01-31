const express =require('express')
const User =require('../models/user.js')
const router = new express.Router()
const bcrypt= require('bcryptjs')

      
router.post('/user', async(req,res)=>
{
console.log(req.body)           

// object for user created now it will be stored into database     
var user =new User(req.body)

try{
        await user.save()
        res.status(200).send(user)
}catch(e)
{
        res.status(400).send(e)
}
      
})


router.post('/user/login',async(req,res)=>{


        // we can write this login checking code here 
        // but we maintain standerd
        // this will increase the size instead of mentaning this here we can mention it in schama

        // here findCredentials is not defaut menthod but we can define body to it in schama

try {
        const user =await User.findCredetials(req.body.email,req.body.password)

        // here we have defined our own method to generate the token
        const token =await user.tokenGenrator()
        console.log('user from try ',token)


        res.status(200).send({"message":"login successfully","toekn":token})
              
} catch (error) {
        console.log('error',error)
        res.status(200).send({"error":"uable to login"})

}


//         const email=req.body.email
//         const password=req.body.password

//         const user = await User.findOne({email})

//         console.log('from /login ',user)
// if(!user)
//   return res.status(400).send({"error":"user not exit"})

//   const isMatch = await bcrypt.compare(password,user.password)

//   if(!isMatch)
//   return res.status(400).send({"error":"user not exit"})

//  res.status(200).send({"message":"login successfully"})
})

module.exports= router  

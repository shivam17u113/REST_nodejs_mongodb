const mongoose =require('mongoose')
const validator =require('validator')
const bcrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value)
        {
                if(!validator.isEmail(value))
                {
                    throw new Error('Email is invalid')
                }
        }

    },
    age :{
        type:Number,
        default:0,
    },
    password:{
        type:String,
        required:true,
    },
    Tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

// this are the methods we are applied on the object
userSchema.methods.tokenGenrator =async function()
{
const user = this
const token = jwt.sign({_id:user._id.toString()},'AnkitaPatil')
// this is used to add new object in array 
user.Tokens= user.Tokens.concat({token})
//we are saving new data
await user.save()
return token
}



// statics are applied on model 
userSchema.statics.findCredetials =async (email,password)=>
{
    console.log("email from staits",email)
    const user = await User.findOne({ email })

    if(!user)
     throw new Error('unable to login')


     const isMatch = await bcrypt.compare(password,user.password)

     if(!isMatch)
     throw new Error('unable to login')

     return user

}

// this is the function that call before evry object saved to data base wich used User as class
// to create object
// do not use => syntax in this function
userSchema.pre('save',async function (next)
{
const user=this

console.log('in userSchema',user)

if(user.isModified("password"))
{
    user.password= await bcrypt.hash(user.password,8)
    console.log('in if')
}

next()
})

// this is the model for user
const User =mongoose.model('User',userSchema)

module.exports =User
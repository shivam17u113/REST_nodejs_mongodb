const mongoose =require('mongoose')
const validator =require('validator')

const User =mongoose.model('User',
{
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
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
    }
})

module.exports =User
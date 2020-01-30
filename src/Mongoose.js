const mongoose =require('mongoose')
const validator =require('validator')

// FIRST IS URL AND /nodejs IS THE DATABSE NAME IN WHICH DATA IS GOING TO STORE
mongoose.connect('mongodb://127.0.0.1:27017/nodejs',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})

// this is the model of which we will create object and sore into databse
// MONGOOSE WILL USE user the first letter as small for data base for that object
const User =mongoose.model('User',
{
    name: {
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        // this is the function which will validate the given input to the object creation
        validate(value)
        {
                if(!validator.isEmail(value))
                {
                    throw new Error('Email is invalid')
                }
        }

    },
    age :{
        type:Number
    }
})

 // WE WILL CREATE THE OBJECT OF THIS METHOD AND SEND TO DB
const obj1= new User(
    {
        name:"shivam",
        email:"shivam.p.parve@gmail.com",
        age:21
    })
    // WE ARE GOING TO SAVE THIS OBJECT IN DB
    // then and catch are the promiss applied by mongoose
    obj1.save().then( (obj1)=>
    {
console.log(obj1)
    }).catch((error) =>
    {
        console.log('Error',error)
    } )



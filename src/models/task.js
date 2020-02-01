const mongoose =require('mongoose')
const validator =require('validator')

// this is the model for Task that we want to store in db

const taskSchema =  new mongoose.Schema({

    dscription:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type :Boolean,
        default:false
    }

},{
    timestamps:true
})

const Task =mongoose.model('Task',taskSchema)

module.exports=Task
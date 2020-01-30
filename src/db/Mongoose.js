const mongoose =require('mongoose')
// this will connect to database with name nodejs
mongoose.connect('mongodb://127.0.0.1:27017/nodejs',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true  
})


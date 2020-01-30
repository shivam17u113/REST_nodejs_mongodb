

var MongoClient = require('mongodb').MongoClient; 

const dbase='shivam'
const url='mongodb://127.0.0.1:27017'

MongoClient.connect(url ,{ useUnifiedTopology: true },{useNewUrkParser:true},(error,client)=>
{
    if(error)
     return console.log('unable to connect to database')

     console.log('connected to db')
   const  db =client.db(dbase)

        db.collection('nodejs').insertOne({"name":"ankita","grno":"17u113"},(error,result)=>{

            if(error)
            return console.log('data not inserted')

            // ops will show inserted document
            console.log(result.ops)
        })

})



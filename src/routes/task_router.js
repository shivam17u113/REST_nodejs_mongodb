const express =require('express')
const Task =require('../models/task.js')

const router = new express.Router()

// this is used to convert string to object id 
// when we pass object id in req.body then this function is used
var ObjectID = require('mongodb').ObjectID;



// post request to send data under url /task
router.post('/task',async(req,res)=>
{
    var task=new Task(req.body)

   
   try {
    console.log(task)
    await task.save()
    res.status(400).send('task saved successfully')
 
   } catch (error) {
    res.status(500).send(e)

   }
})

// we can apply all the crud operations on Model 
router.get('/task_list',async(req,res)=>
{
        
        try {
            const data= await Task.find({})
            res.send(data)
            console.log(data)
        } catch (e) {
            res.send(e)
            console.log(e)
        }
        
})

// deleting the data using particular id

router.get('/task_id/:id',async(req,res)=>
{
   // it is necessary to pass _id only to findById() not req.param.id
    const _id=req.params.id
try {
    const data = await Task.findByIdAndRemove(_id)
    console.log(data)
    res.send(data)

} catch (e) {
    console.log(e)
    res.send(e)
}


})

// for update we have to accept the id from user as well as the new name of that property

// again we have to check whether the update is following all rules

// if any one of the property the user wnat to update is not in collection then error must be thrown

// for update we use patch method of express

// the update function my be asynchrouns 
// wait must be wriiten there

router.patch('/task_update',async (req,res)=>{

    const _id= ObjectID(req.body.id)
// it may happen that user want to udate any field which is not allowed
// for that we need to check


// list of filed user want to update
const updates=Object.keys(req.body)

// allowed updation
// we have include id as it is sent through req.body 
// after updation it will remain same as we are replaing it with same id 
const allowedUpdates =['dscription','completed','id']

console.log('updates',updates)
console.log('id we wnat to update ',_id)
console.log('req.body ',req.body)

// every ffunction checks if each item is present in list
// it retruns true only if all tems are presnt in x.includes(y) in x

// the elemts we want to update must be present in allowedUpdates list

const isValidUpdation =updates.every((update)=> allowedUpdates.includes(update))
console.log("isvalid",isValidUpdation)
if(!isValidUpdation)
return res.status(400).send({"error":'invalid updates'})



try
{
    // we have fetched the task by id
 const task =await Task.findById(_id)
 
 // updates is list which conatins the elements we want to update
 // for each elements in updates we replace fetched data with new data from request

 updates.forEach((update)=>
 {
task[update]= req.body[update]
 })

 if(!task)
 return res.status(404).send()

  await task.save()
   res.send(task)

   // below method not support the mongoose schma vlidation so we do update by 
   // fetching and then ipdating the data

  //  const user = await Task.findByIdAndUpdate(_id,req.body,{new:true, runValidators:true}) 

}catch(e)
{
     res.status(400).send(e)
}




})

module.exports=router
# REST_nodejs_mongodb
step 0:
we have created conncetion with database using mongoose and stoed in seperate folder called db.
we will export this and use when ever necessary.

step 1:
  first we have to create the model using express to sotre the data into data base.
  we have seperate folder model in src which contains the model database schema for each collection
  we use that model by exporing to create object and store into database

  step 2:
  when any get/post/delete/patch request for particular model come then we have created seperate 
  roter for each model and stored in src/ model folder.
  we have created route object and using which we will mange all request related to that model.
  we have expoted that route from each file

  step 3:
  index.js is our main server.
  to avoid laod on single file we have devided the models into each file and then finally we use each model
  in index file.
  so that the routing takes place.

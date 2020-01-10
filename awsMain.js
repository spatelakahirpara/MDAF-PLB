const express= require('express');
const router= express.Router();
const db= require('./models/dbConnection');
var awsController= require('./controllers/aws.controller.js');
const request = require('request');

router.post('/api/checkInstanceName',async function(req,res,next){
    console.log("teest3");    
    console.log((req.content-type));

   

console.log("teest3");
res.send("hey");
    // db.query('select InstanceName from tblAWS where UserID=? AND InstanceName=(?) ;',[req.UserID, req.InstanceName],(err,data)=>{
    //     if(err) throw err;
    //     else if(data.length!=0) res.send("true");
    //     else res.send("false");
    //  });
});
router.post('/api/haveTag',async function(req,res,next){
    var reqest= req.body;
    console.log("teest1");
    request.post({
        headers: {'content-type' : 'application/json','go':'go'},
        url:     'http://localhost:3000/api/checkInstanceName'
      }, function(err, response, body){
        console.log("teest2");
        if (err) { return console.log(err); }
        console.log("resposne"+body);
      });
    // request.post({url:'http://localhost:3000/api/checkInstanceName', body: "val"},  (err, res) => {
    //     console.log("teest2");
    //     if (err) { return console.log(err); }
    //     console.log("resposne"+res.body);
    //   });
      res.send("complete");

});
router.post('/api/createInstance',async function(req,res,next){
    //passing userId and instanceName 

    //if there is userid and instanceName exists then throw error or create the instance

});
router.post('/api/checkStatus',async function(req,res,next){
    //input will be InstanceName and userID... get the instanceId to perform other task
    //check the status
    //give the result

});
router.post('/api/startInstance',async function(req,res,next){
   //input require: Insatnace name and UserId... get the instanceId to perform other task
   //return success
   awsController.startInstance(req.body.UserID,req.body.InstanceID);
});
router.post('/api/listInstance',async function(req,res,next){
    //passing userId and instanceName 
    awsController.listInstance(req,res,req.body.UserID);
    //if there is userid and instanceName exists then throw error or create the instance

});
router.post('/api/aws',async function(req,res,next){
    //if Tag is not present in the AWS EC2 then create an instance
    
    console.log("ans", await awsController.getInstanceId(req.body.InstanceName));
  //console.log(await awsController.checkTagName(req.body.InstanceName));
    // if(awsController.checkTagName(req.body.InstanceName)==true){
    // }
    // else{
    //     console.log("error");
    //console.log(awsController.createInstance(req.body.InstanceName));
    // }
    
    //check status of the instance
     //console.log(await awsController.checkStatus(req.body.UserID,req.body.InstanceName));
    // if(checkStatus()==="running"){
    //     //business logic
    //     console.log("business logic");
    // }
    // else{
    //     //start the instance
    //awsController.startInstance(req.body.UserID,req.body.InstanceName)
    //     console.log("start instance");
    // }
    res.send("success");
});


async function getInstance(){
    let call= createInstance();

}


module.exports= router;  
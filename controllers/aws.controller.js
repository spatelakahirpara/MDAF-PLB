var AWS = require('aws-sdk');
var db= require('../models/AwsModel.js');
AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

exports.createInstance=function(tagName){
    
    var instanceParams = {
        ImageId: 'ami-0d5d9d301c853a04a', 
        InstanceType: 't2.micro',
        MinCount: 1,
        MaxCount: 1
     }; 
     
     // Create a promise on an EC2 service object
     var instancePromise = new AWS.EC2().runInstances(instanceParams).promise();
     
     // Handle promise's fulfilled/rejected states
     instancePromise.then(
       function(data) {
         //console.log(data);
         var instanceId = data.Instances[0].InstanceId;
         console.log("Created instance", instanceId);
         // Add tags to the instance
         tagParams = {Resources: [instanceId], Tags: [
            {
               Key: 'Name',
               Value: tagName
            }
         ]};
         // Create a promise on an EC2 service object
         var tagPromise = new AWS.EC2().createTags(tagParams).promise();
         // Handle promise's fulfilled/rejected states
         tagPromise.then(
           function(data) {
            // console.log("Instance tagged"+data.Instances[0]);
            db.insertInstance(1,instanceId,tagName);
            return instanceId;
             
           }).catch(
             function(err) {
             console.error(err, err.stack);
           });

       }).catch(
         function(err) {
         console.error(err, err.stack);
       });
       
}  
exports.getInstanceId= async function(userId,tagName){
    //console.log(db.checkTagName(tagName));
    var r= await db.getInstanceId(userId,tagName);
    console.log("from controller", r);
    return r;

}
exports.checkTagName=function(tagName){
    //console.log(db.checkTagName(tagName));
    return db.checkTagName(tagName);

}
exports.checkStatus=async function(userId,tagName){
    const instanceId= await db.getInstanceId(userId,tagName);
    console.log("id",instanceId)
    var params = {
        InstanceIds: [
            instanceId
        ]
       };
       const status= await ec2.describeInstanceStatus(params, async function(err, data) {
           const result= data;
           
         if (err) console.log(err, err.stack); // an error occurred
         else {
            console.log("try to get status",result.InstanceStatuses);
             if(result.InstanceStatuses.length==0){
                 console.log("stopped");
             }
            // console.log(result);

             //console.log(data.InstanceStatuses[0].InstanceState.Name);
            // var result=data.InstanceStatuses[0].InstanceState.Name;
            return result;           // successful response
         }    
        
       });
       return status;
}
exports.listInstance=async function(req,res,userId){
    var list= db.listInstances(req,res,userId);
    
}
exports.startInstance=async function(userId,tagName){
   // var instanceId= db.getInstanceId(userId,tagName);
    var params = { 
        InstanceIds: [ 'i-06c4518569eddfa53' ] 
        }; 
        ec2.startInstances(params, function(err, data) { 
        if (err) 
        console.log(err, err.stack); 
        else 
        console.log(data);  
        });
        return null;
}
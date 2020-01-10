const express= require('express');
const db= require('./dbConnection');

exports.insertInstance=function(userId,instanceID,tagName){
    db.query('INSERT INTO tblAWS (UserID,InstanceID,InstanceName) VALUES (?,?,?);',[userId,instanceID,tagName],(err,data)=>{
        if(err) throw err;
        console.log(data);
    });
    return "success";
 
}
exports.getInstanceId =function (userId,tagName){
    db.query('select InstanceId from tblAWS where UserID=? AND InstanceName= ?;'
    ,[userId,tagName],  (err,data)=>{
        if(err) throw err;
        console.log("from model1",  data[0].InstanceId);
        return data[0].InstanceId;
    });
}
exports.listInstances= async function (req,res,userId){
    db.query('select InstanceId from tblAWS where UserID=? '
    ,[userId],  (err,data)=>{
        if(err) throw err;
        console.log("from model1",  data);
        res.send(data);
    });
}
var flag= false;
exports.checkTagName= async function (tagName){
     
      const result= await db.query('select InstanceName from tblAWS where InstanceName=(?);',[tagName],(err,data)=>{
        console.log("f1,"+flag);
        
        if(err) throw err;
        
        else if(data.length!=0){
            flag=true;
            console.log("f2,"+flag);
            return true;
        }
        else {
            flag=false; 
            console.log("f3,"+flag);
            return false;
        }
     });
    console.log("flag4=",result);
    return result;
}



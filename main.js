var express= require('express');
var app= express();
var bodyParser = require('body-parser');
const util= require('util');
var exec = util.promisify(require('child_process').exec);
var outputString;

app.use(bodyParser.json());
app.listen(3000);
async function call(req,res,next){
    const {stdout,stderr} = await exec("~/Desktop/second.sh");
    outputString= stdout.toString();
    console.log("output");
    console.log("___________________________");
    console.log(stdout.toString());
    console.log("___________________________");
    console.log("error:");
    console.log("___________________________");
    console.log(stderr.toString());
    console.log("------------Done------------");
    
    
}
// async function call(req,res,next){
//     const {stdout,stderr} = await exec("~/Desktop/second.sh");
//     outputString=stdout.toString(); 
//     console.log("output from the script: ");
//     console.log("___________________________");
//     console.log(outputString);
//     console.log("___________________________");
//     const lines = outputString.split(/\r?\n/);
//     var url="";
//     var findUrl="FINAL_URL";
//         lines.forEach((line) => {
//             if(line.search(findUrl)!=-1){
//             url=line.slice(findUrl.length+1);     
//         }  
//         });
//     if(url===""){
//         console.log("no url found");
//     }
//     else{
//         console.log("found the url::::: "+url);
//     }

// }
call();

process.on("unhandledRejection", (reason, p) => {
    console.log(reason + " ************** Unhandled Rejection at Promise ****************** ");
    console.log(p);
})
.on("uncaughtException", err => {
    console.log("Uncaught Exception thrown");
    console.log(err);
    process.exit(1);
});




const express = require("express")
const app = express();//app is our handler function
const port = 8080 
const hostName = "localhost"
const users = require("./MOCK_DATA.json");
const fs = require("fs")
const mongoose = require("mongoose")

const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";
const dbName = "usersInfo_db"
const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
console.log(uri)

mongoose.connect(uri,{authMechanism:authMechanism,dbName:dbName}).then(()=>{
console.log("mongodb connected")
}).catch((error)=>{
    console.log(`mongodb connection error: ${error}`)
})
//const connection = mongoose.createConnection(uri,{authMechanism:authMechanism,dbName:dbName});
 
app.use(express.urlencoded({extended: false})); //this is used to parse body from x-www-form-urlencoded data


const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required : true
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    },
    Job_title:{
        type:String,
        required:true
    }
   },
{
    timestamps:true
})
const userModel = mongoose.model("userModel",userSchema) //mongodb will automatically change model name as plural i.e., userModels

 app.use((req,res,next)=>{
    const data = `New ${req.method} request received at ${Date.now()} at ${req.url}\n`
    fs.appendFile("./log.txt",data,(error)=>{
        if(error){
            console.log(error)
        }
    })
    next()
 })

//REST APIs with db integration
app.get('/api/users',(req,res)=>{
   console.log(req.headers);
    res.setHeader("X-custom", "user-fetched") //set header
return res.send(users)
})

app.post("/api/users",async(req,res)=>{
    const body = req.body //{"first_name": "devyani","last_name": "sharma","email": "dsharma1@bluehost.com","gender":"Female", "Job_title":"IT Tech"}
    console.log(JSON.stringify(body))

    if(!body|| !body.first_name|| !body.last_name|| !body.email|| !body.gender|| !body.Job_title){
        return res.status(400).send({"message":"all fields are mandatory"})
    }
    const result = await userModel.create({
        "first_name":body.first_name,
        "last_name": body.last_name,
        "email": body.email,
        "gender":body.gender,
        "Job_title":body.Job_title
    }
)
    res.status(201).send(result)

    

})
//Dynamic parameter id 
//we cna chain methods if route is same so that in future if we need to do any update then we can update route easily
app.route("/api/users/:id").
get((req,res)=>{
    const id  = Number(req.params.id);
    const user = users.find(user => user.id === id)
    return res.send(user)
}).
put((req,res)=>{
    const id = Number(req.params.id)
    const body = req.body;
    if(!id || !body|| !body.first_name|| !body.last_name|| !body.email|| !body.gender|| !body.Job_title){
        return res.status(400).send({"message":"all fields are mandatory"})
    }
    const index = users.findIndex(user => user.id ===id)
    if(index === -1){
         return res.status(404).json({"msg":"id not found"})
    }
    users[index] = {"id":id, ...body}
    console.log(users[index])
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
        if(error){
            console.log(error)
        }
        res.status(200).send(users[index])
    })  
}).
delete((req,res)=>{
    const id = Number(req.params.id)
    const index = users.findIndex(user=>user.id===id)
    if(index===-1){
        res.send(404).send({message:"user not found"})
    }else{
        users.splice(index,1)
    }
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
        if(error){
            console.log(error)
        }
        res.status(200).send({
            message:"user deleted successfully",
            user:users[index]
        })
    })  

})

app.listen(port,hostName,()=>{
   console.log(`server is listening on port ${port}`);
})

// function restApiCreationWithoutDB(){
//     //REST APIs without db integration
// app.get('/api/users',(req,res)=>{
//     console.log(req.headers);
//      res.setHeader("X-custom", "user-fetched") //set header
//  return res.send(users)
//  })
 
//  app.post("/api/users",(req,res)=>{
//      const user = req.body //{"first_name": "devyani","last_name": "sharma","email": "dsharma1@bluehost.com","gender":"Female", "Job_title":"IT Tech"}
//      console.log(JSON.stringify(user))
//      if(!user|| !user.first_name|| !user.last_name|| !user.email|| !user.gender|| !user.Job_title){
//          return res.status(400).send({"message":"all fields are mandatory"})
//      }
//      users.push({...user,"id":users.length+1})
//      fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
//      if(error){
//          console.log(error)
//      }
//      console.log(users[0])
//      res.status(201).send(users[users.length-1])
//  })
     
 
//  })
//  //Dynamic parameter id 
//  //we cna chain methods if route is same so that in future if we need to do any update then we can update route easily
//  app.route("/api/users/:id").
//  get((req,res)=>{
//      const id  = Number(req.params.id);
//      const user = users.find(user => user.id === id)
//      return res.send(user)
//  }).
//  put((req,res)=>{
//      const id = Number(req.params.id)
//      const body = req.body;
//      if(!id || !body|| !body.first_name|| !body.last_name|| !body.email|| !body.gender|| !body.Job_title){
//          return res.status(400).send({"message":"all fields are mandatory"})
//      }
//      const index = users.findIndex(user => user.id ===id)
//      if(index === -1){
//           return res.status(404).json({"msg":"id not found"})
//      }
//      users[index] = {"id":id, ...body}
//      console.log(users[index])
//      fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
//          if(error){
//              console.log(error)
//          }
//          res.status(200).send(users[index])
//      })  
//  }).
//  delete((req,res)=>{
//      const id = Number(req.params.id)
//      const index = users.findIndex(user=>user.id===id)
//      if(index===-1){
//          res.send(404).send({message:"user not found"})
//      }else{
//          users.splice(index,1)
//      }
//      fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
//          if(error){
//              console.log(error)
//          }
//          res.status(200).send({
//              message:"user deleted successfully",
//              user:users[index]
//          })
//      })  
 
//  })
// }
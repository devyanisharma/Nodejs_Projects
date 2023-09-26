const express = require("express")
const app = express();//app is our handler function
const port = 8080 
const hostName = "localhost"
const users = require("./MOCK_DATA.json");
const fs = require("fs")

app.use(express.urlencoded({extended: false})); //this is used to parse body from x-www-form-urlencoded data

//REST APIs
app.get('/api/users',(req,res)=>{
return res.send(users)
})

app.post("/api/users",(req,res)=>{
    const user = req.body //{"first_name": "devyani","last_name": "sharma","email": "dsharma1@bluehost.com","gender":"Female", "Job_title":"IT Tech"}
    console.log(JSON.stringify(user))
    users.push({...user,"id":users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
    if(error){
        console.log(error)
    }
    console.log(users[0])
    res.status(201).send(users[users.length-1])
})
    

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
    const index = users.findIndex(user => user.id ===id)
    users[index] = {"id":id, ...body}
    console.log(users[index])
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error)=>{
        if(error){
            console.log(error)
        }
        res.status(200).send(users[index])
    })  
}).
patch((req,res)=>{
    // const id = Number(req.params.id);
    // const body = req.body
    // const index = users.findIndex(user => user.id === id)
    // const user = users[index]
    // if(body.includes("firstname")){

    // }  
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

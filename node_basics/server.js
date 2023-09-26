// server 
const http = require("http")
const url = require("url")
const fs = require("fs")




const server = http.createServer((req,res) => {
    const data = `New request received at ${Date.now()} with ${req.method} on ${req.url}\n`
    const myurl = req.url;
    console.log(url.parse(myurl,true))
    if(req.url === "/favicon.ico") return res.end();
        console.log("new request received")
        fs.appendFile("./log.txt", data, (error) => {
            if (error) {

                console.log("error in appending file")
                console.log(error)
            }else{
                res.end("request received")
            }
        })
})
const port = 8080 
const hostName = "localhost"
server.listen(port,hostName,()=>{
    console.log(`server is listening on port ${port}`)
})


const fs = require("fs")
const os = require("os")
console.log("cpu cores - " +  os.cpus().length);

fs.writeFile("./example.txt","hello! i am a async file",(writeErr)=>{
    if (writeErr) {
        console.log("Error writing to file:", writeErr);
      } else {
        console.log("async file written successfully.");

}})


fs.readFile('./example.txt', 'utf-8', (readErr, data) => { // UTF-8 decoding to avoid binary code output.
    if (readErr) {
      console.log("Error reading from file:", readErr);
    } else {
      console.log(data);
    }
  });

  fs.writeFileSync("./exampleAsync.txt","hello! i am a sync file ");
  const data  = fs.readFileSync("./exampleAsync.txt","utf-8");
  console.log(data);

fs.appendFile("./example.txt","appended text",(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log(fs.readFileSync("./example.txt","utf-8"));
    }
})
fs.unlinkSync("./exampleAsync.txt"); //to delete file
console.log(fs.statSync("./example.txt")) // to see stats i.e., file details
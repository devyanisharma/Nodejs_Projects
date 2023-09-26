
function numoccur(){
    let arr = [1,2,3,4,5,6,1,2]
    let map = new Map();
    for(let i=0;i<arr.length;i++){
        if(!map.get(arr[i])){
            map.set(arr[i],1)
        }else{
            map.set(arr[i],map.get(arr[i]) + 1) 
        }
    }
    console.log(map);
}
// numoccur();

//using map
function charOccur() {
     let str = "adfffsfp";
    let map = new Map();
    for(let i = 0;i<str.length;i++){
        if(!map.get(str.charAt(i))){
            map.set(str.charAt(i),1)
        }else{
            map.set(str.charAt(i),map.get(str.charAt(i))+1)
        }
    }
    
    let occ = {}
    for (const[key,value] of map.entries()){
        occ[key] = value;
    }
  
    console.log(occ);
  }
  
  //charOccur();

  //using obj
  function charOccur() {
    let str = "adfffsfp";
    let obj = {};
 
   for (let i = 0; i < str.length; i++) {
     if (!obj.hasOwnProperty(str.charAt(i))) {
       obj[str.charAt(i)] = 1;
     } else {
       obj[str.charAt(i)] = obj[str.charAt(i)] + 1;
     }
   }
 
   console.log(obj);
 }
 
 //charOccur();

 //missing number
function getMissingNumber(){
    let arr = [1,4,6,11];
    let missingarr = []
    let maxNumber = Math.max(...arr);

    for(let i = 1;i<=maxNumber;i++){
        if(arr.indexOf(i)===-1){
         missingarr.push(i)

        }
    }
    console.log(missingarr)
        
    
}
getMissingNumber();

//remove duplicate
function remduplicat(){
    let str = "geeksforgeeks";
    let map = new Map();
    let stri = ""
    for(let i = 0;i<str.length;i++){
         if(!map.get(str.charAt(i))){
             map.set(str.charAt(i),1)
             stri =  stri.concat(str.charAt(i))
         }
    }
     console.log(stri)
}
remduplicat();

//remove duplicateArray
function remduplicatArray(){
    let str = [1,2,3,2,3,4];
    let map = new Map();
    let stri = [];
    for(let i = 0;i<str.length;i++){
         if(!map.get(str[i])){
             map.set(str[i],1)
             stri.push(str[i])
         }
    }
     console.log(stri)
}
remduplicatArray();

let numbers = new Set([10, 20, 20, 30, 40, 50]);

console.log(numbers); //Set(5) { 10, 20, 30, 40, 50 }
console.log(typeof numbers); // Object
myName = "Devyani \n"
console.log(`${myName.repeat(3)}`)
let add = function(x,y){
    return x+y;
}
console.log(add(2,3))

var num = [2,4,6,8];
num.forEach(element=>{
    console.log(element +"->"+ element/2)
})

//generator
function* generator(num) {
    yield num + 10;
    yield num + 20;
    yield num + 30;
  }
  let gen = generator(10);
 
  console.log(gen.next().value); // 20
 console.log(gen.next().value); // 30
console.log(gen.next().value); // 40

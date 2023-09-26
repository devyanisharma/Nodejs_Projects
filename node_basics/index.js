// let numbers = new Set([10, 20, 20, 30, 40, 50]);

// console.log(numbers); //Set(5) { 10, 20, 30, 40, 50 }
// console.log(typeof numbers); // Object
// myName = "Devyani \n"
// console.log(`${myName.repeat(3)}`)
// let add = function(x,y){
//     return x+y;
// }
// console.log(add(2,3))

// var num = [2,4,6,8];
// num.forEach(element=>{
//     console.log(element +"->"+ element/2)
// })
function* generator(num) {
    yield num + 10;
    yield num + 20;
    yield num + 30;
  }
  let gen = generator(10);
 
  console.log(gen.next().value); // 20
 console.log(gen.next().value); // 30
console.log(gen.next().value); // 40

var x=10;
var x=30;//redeclaration
console.log(x);

let a=30
a=50
a="sibi" //reassign

const b=50;
console.log(b);
console.log(typeof a);

let c=22
{
    let c=30
}
console.log(c);

let obj={
    name:"sibi",
    age:18
}
console.log(obj.name);
console.log(obj.age);


let num=30;
let num2=num;
 num2=50;
console.log(num2);
console.log(num);

console.log(5==='5');


function add(a,b){
    return a+b;
}
console.log(add(10,50));

console.log(add(10,20,30))
const add=(a,b,c)
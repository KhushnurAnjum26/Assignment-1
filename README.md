Note*** I am unable to turn on by bangla keyboard so i am submitting the answers in English!!!

<!-- 1) Difference between null and unidentified- -->

--Null:When a variable is knowingly set to zero or empty then that variable iss called null.
ex- let x =null;

--Undefined: When a variable is declared but no value is assigned to it then it is called undefined.
ex- var p;
console.log(p);

<!-- 2) What is the use of the map() function in JavaScript? How is it different from forEach()? -->

Map() : Map() is a type of array where it works on each element of the array and returns a new type of array.As it returns the new array in this sector it is different from forEach

exp- let nums = [1,2,3];
let res = nums.map(num=>num +15)

console.log(res);

ForEach() : It is a type of array which works on each element of that array but doesnt return any array.

exp- nums.forEach(num => {
    console.log(num);
});



<!-- 3) What is the difference between == and ===? -->


The main difference is that,
'==' checks only the value of data. if the value is simmilar then it returns true .It cannot convert the datatype. This is called type coercion.

'===' checks both the value and type of the data, if both are true then it returns true.


<!-- 4) What is the significance of async/await in fetching API data? -->


Async/await dispayes a asynchronous code in syncrounous way. It makes the code clean and easier to interpret when written for a huge numbers of API . It smotthens the promise handling by replacing '.then' keyword.


<!-- 5) Explain the concept of Scope in JavaScript (Global, Function, Block). -->


Global : A variable which can be used from any part of the code is called global scoped variable.
Exp- let b=90;

Block : A variable which can only be accessed from specific {} blocks are called blocked scoped variable.

Exp-
if(false){
    let p=20;
}

Function : The variable which can only be used from specific functions is called function scoped variable.

Exp- function pipa(){
    var c =29;
}
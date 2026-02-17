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




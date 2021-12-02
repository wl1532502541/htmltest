for(let i=0;i<5;(i=i+1)&&console.log("i:",i)){
    let i='abc'
    console.log(i)
}
console.log(i)
// abc
// i: 1
// abc
// i: 2
// abc
// i: 3
// abc
// i: 4
// abc
// i: 5
// ReferenceError: i is not defined
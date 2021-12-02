// function getType(obj){
//     if(typeof obj !='object')return typeof obj
//     return Object.prototype.toString.call(obj).slice(8,-1)
// }
function getType(obj){
    return obj===null ? 'null' : typeof obj == 'object' ? Object.prototype.toString.call(obj).slice(8,-1).toLowerCase() : typeof obj
}
console.log(getType(null))
console.log(getType(undefined))
console.log(getType(1))
console.log(getType('asd'))
console.log(getType(true))
console.log(getType({a:1}))
console.log(getType(function a(){}))
console.log(getType([1.2]))
console.log(getType(Symbol(1)))


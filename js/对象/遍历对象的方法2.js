let a = Object.create(Object.prototype,{
    a:{
        enumerable:true,
        configurable:true,
        value:1,
        writable:true
    }
})
let b = Object.create(a,{
    b:{
        enumerable:true,
        configurable:true,
        value:2,
        writable:true
    },
    c:{
        enumerable:false,
        configurable:true,
        value:3,
        writable:true
    }
})

let arrFor = []
for(var i in b){
    arrFor.push(i)
}
console.log(arrFor)
console.log(Object.keys(b))
console.log(Object.getOwnPropertyNames(b))
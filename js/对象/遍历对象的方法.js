const parentObj={
    a:'aaaaa',
    b:Symbol("bbbbb"),
    c:'ccccc'
}
const Obj=Object.create(parentObj,{
    d:{
        value:'ddddd',
        enumerable:true
    },
    e:{
        value:'eeeee',
        enumerable:false
    },
    [Symbol('f')]:{
        value:'fffff',
        enumerable:true
    }
})
// const myObj=Object.create(Obj,{
//     wl:{
//         value:'帅',
//         enumerable:true
//     }
// })

//1.Object.keys(obj)
//返回对象上不含Symbol的可枚举属性
console.log('Object.keys()',Object.keys(Obj))

//2.Object.values(obj)
//返回对象上不含Symbol的可枚举属性的值
console.log('Object.values()',Object.values(Obj))

//3.Object.entries(obj)
//返回对象上不含Symbol的可枚举属性的属性和值
console.log('Object.entries',Object.entries(Obj))

//4.Object.getOwnPropertyNames(obj)
//返回对象上不含Symbol的可枚举和不可枚举属性
console.log('Object.getOwnPropertyNames()',Object.getOwnPropertyNames(Obj))

//5.Objet.getOwnPropertySymbols(obj)
//返回对象上所有Symbol
console.log('Objet.getOwnPropertySymbols()',Object.getOwnPropertySymbols(Obj))

//6.for ...in
//遍历所有自身和原型上可枚举属性
//如果不需要原型上的可以用obj.hasOwnProperty()判断是否是自身的属性
for(let key in Obj){
    console.log('for in',key)
}

//7.for ...of
//必须部署了Iterator接口后才能使用。适用范围：数组、Set和Map解构、类数组对象（arguments,DOMNodeList对象...）、Generator对象以及字符串
for(let value of Object.values(Obj)){
    console.log('for of',value)
} 

//8.forEach
//使用break不能中断使用
Object.values(Obj).forEach(value=>{
    console.log('forEach:',value)
})

//9.Reflect.ownKeys(obj)
//返回一个数组，包含对象自身的所有属性，不管属性名是Symbol还是字符串，也不管是否枚举
console.log('Reflect.ownKeys()',Reflect.ownKeys(Obj))

function myNew(fn,...args){
    // let obj={}
    // obj.__proto__=fn.prototype
    let obj=Object.create(fn.prototype)
    let res=fn.call(obj,...args)//返回结果是对象则返回，不是则返回函数实例化对象
    return typeof res =='object'?res:obj
}
function Person(name,age){
    this.name = name;
    this.age = age;
}
const person1 = new Person("Lee",21);
const person2 = myNew(Person,"Lee",21)
console.log(person1,person2)
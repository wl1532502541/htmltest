function myInstanceof(example,classFunc){
    let proto=Object.getPrototypeOf(example)    //等于example.__proto__
    while(true){
        if(!proto)return false;
        if(proto==classFunc.prototype)return true
        proto=Object.getPrototypeOf(proto)
    }
}
function person(name){
    this.name=name
}
let a1=new person("张三")
console.log(myInstanceof(a1,person))
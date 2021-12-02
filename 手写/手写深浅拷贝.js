//浅拷贝
function shallowCopy(source){
    if(source==null||typeof source !='object')return source
    if(source instanceof Array){   //第二种写法 Array.isArray(obj)
        return [...source]
    }else{
        return {...source}
    }
}

//深拷贝
//1.简洁版
// 缺点     他无法实现对函数 、RegExp等特殊对象的克隆
//          会抛弃对象的constructor,所有的构造函数会指向Object
//          对象有循环引用,会报错
function deepCopy0(source){
    return JSON.parse(JSON.stringify(source))
}


//2.正式版
function deepCopy(source){
    if(source==null||typeof source !='object')return source
    let target=source.constructor==Array?[]:{}
    for(let key in source){
        if(source.hasOwnProperty(key)){
            target[key]=deepCopy(source[key])
        }
    }
    return target
}

//test

// 1.obj
let source={
    a:1,
    b:[2,[3]],
    c:{d:4,e:[5,6]}
}

// 2.array
// let source=[1,2,[3,[4]],{a:1,b:{c:2}}]

let target=deepCopy(source)
console.log('target:'+JSON.stringify(target))
console.log('source:'+JSON.stringify(source))
console.log('alert target start')

// 1.obj
target.a=2
target.b[1]={f:1}
target.c.d=5

// 2.array
// target[0]=2
// target[2][1]=5
// target[3].a=2
// target[3].b.c=3

console.log('alert target end')
console.log('target:'+JSON.stringify(target))
console.log('source:'+JSON.stringify(source))
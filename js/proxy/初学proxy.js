//简单例子，拦截get
let target={
    x:10,
    y:20
}
let handler = {
    get:(obj,prop)=>42
}

target = new Proxy(target,handler)

console.log(target.x);  //42
console.log(target.y);  //42

//自己写的带set get
let t={
    a:1
}
let guardFunction={
    get:(obj,key)=>{console.log(`属性${key}被访问`);return obj[key]},
    set:(obj,key,val)=>{console.log(`属性${key}被更改为${val}`)}
}
let guard = new Proxy(t,guardFunction)
guard.a;//属性a被访问
guard.a=1;//属性a被更改为1

//默认值
const withDefaultVal = (obj,defaultVal)=> new Proxy(obj,{
    get:(obj,prop)=>obj[prop]?obj[prop]:defaultVal
})

let pos={
    x:1,
    y:2
}
console.log("pos.z:",pos.z)
newpos=withDefaultVal(pos,0)
delete pos.x
console.log("pos.x:",pos.x)
console.log("newpos.x:",newpos.x)
console.log("newpos.z:",newpos.z)

//负索引数组
const negativeArray = (els) => new Proxy(els,{
    get:(target,propKey,receiver)=> Reflect.get(target,
        (+propKey < 0)?String(target.length + +propKey):propKey,receiver)
}) 
const unicorn = negativeArray(['🐴','🎂','🌈']);
console.log("unicorn[-1]:",unicorn[-1])

//隐藏属性
const hide = (target, prefix = '_') => new Proxy(target, {
    has: (obj, prop) => (!prop.startsWith(prefix) && prop in obj),
    ownKeys: (obj) => Reflect.ownKeys(obj)
      .filter(prop => (typeof prop !== "string" || !prop.startsWith(prefix))),
    get: (obj, prop, rec) => (prop in rec) ? obj[prop] : undefined
})

let userData = hide({
    firstName: 'Tom',
    mediumHanle:'@tbarrasso',
    _favoriteRapper:'Drake'
})
console.log("userData._favoriteRapper:",userData._favoriteRapper);
console.log("'_favoriteRapper' in userData:",'_favoriteRapper' in userData);

//缓存
const ephemeral = (target,ttl = 60) =>{
    const CREATED_AT = Date.now()
    const isExpired = () =>(Date.now() - CREATED_AT) > (ttl * 1000)

    return new Proxy(target,{
        get:(obj,prop) => isExpired() ? undefined : Reflect.get(obj,prop)
    })
}
let bankAccount = ephemeral({
    balance:14.93
},10)
console.log(bankAccount.balance) //14.93
// setTimeout(()=>{
//     console.log(bankAccount.balance); //undefined
// },10 * 1000)     //10秒后取值发现失效

//枚举和只读视图
//只读视图
const NOPE = ()=>{
    throw new Error("Can't modify read-only view")
}
const NOPE_HANDLER = {
    SET:NOPE,
    defineProperty:NOPE,
    deleteProperty:NOPE,
    preventExtensions:NOPE,
    setPrototypeOf:NOPE
}
const readOnlyView = target => new Proxy(target,NOPE_HANDLER)
//枚举视图
const createEnum=(target)=>readOnlyView(new Proxy(target,{
    get:(obj,prop)=>{
        if(prop in obj){
            return Reflect.get(obj,prop)
        }
        throw new ReferenceError(`Unknown prop "${prop}"`)
    }
}))
let SHIRT_SIZES = createEnum({
    S: 10,
    M: 15,
    L: 20
  })
  
  SHIRT_SIZES.S // 10
  SHIRT_SIZES.S = 15
  
  // Uncaught Error: Can't modify read-only view
  
  SHIRT_SIZES.XL
  
  // Uncaught ReferenceError: Unknown prop "XL"

//运算符重载
const range = (min,max) => new Proxy(Object.create(null),{
    has:(_,prop) => (+prop >= min && +prop <= max)
})
const X = 10.5
const nums = [1,5,X,50,100]
if(X in range(1,100)){  //true
    //...
}

nums.filter(n => n in range(1,10))

//cookie对象
const getCookieObject = () => {
    const cookies = document.cookie.split(';').reduce((cks, ck) => 
	({[ck.substr(0, ck.indexOf('=')).trim()]: ck.substr(ck.indexOf('=') + 1), ...cks}), {});
    const setCookie = (name, val) => document.cookie = `${name}=${val}`;
    const deleteCookie = (name) => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

    return new Proxy(cookies, {
	set: (obj, prop, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
        deleteProperty: (obj, prop) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop))
     })
}
let docCookies = getCookieObject()

docCookies.has_recent_activity              // "1"
docCookies.has_recent_activity = "2"        // "2"
delete docCookies2["has_recent_activity"]   // true

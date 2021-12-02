Function.prototype.myCall=function(context,...args){
    if(typeof context === 'undefined' || context === null){
        context = window
    }
    let tempFn=Symbol('tempFn')
    context[tempFn] = fn
    let res = context[tempFn](...args)
    delete context[tempFn]
    return res
}
function f(a,b){
    console.log(a+b)
    console.log(this.name)
}
let obj={
    name:'name'
}
f.myCall(obj,1,2) 

Function.prototype.myApply=function(context=window,args){
    let tempFn=Symbol('tempFn')
    context[tempFn]=fn
    let res=context[tempFn](args)//传参和call不同
    delete context[tempFn]
    return res
}

Function.prototype.myBind=function(context=window,...outerArgs){
    return (...innerArgs)=>{
        return context.myCall(...outerArgs,...innerArgs)
    }
}
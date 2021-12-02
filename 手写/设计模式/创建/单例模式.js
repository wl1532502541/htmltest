var Singleton = function(name){
    this.name=name
}
Singleton.getInstance=(()=>{
    let instance;
    return function(name){
        return instance || (instance = new Singleton(name))
    }
})()
var a = Singleton.getInstance('123')
var b = Singleton.getInstance('321')
console.log(a,b)    //Singleton { name: '123' } Singleton { name: '123' }
console.log(a===b)  //true

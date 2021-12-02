function Father(name,age){
    this.name=name
    this.age=age
}

Father.prototype.isHandSome=true

function Son(){
    this.hobby='play'
}

Son.prototype=new Father()

let son=new Son('wl',21)
console.log(son.name,son.age,son.hobby,son.isHandSome)

function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	console.log(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
// Son.prototype = new Father();//继承父类方法,第二次调用Father() 
//修正了原先如上第二次调用父类构造函数会因为多余的父类属性造成内存浪费的缺点
Son.prototype = Object.create(Father.prototype,{
    constructor:{
        value:Son,
        enumerable:false,
        writable:true,
        configurable:true
    }
})
Son.prototype.sayAge = function(){
	console.log(this.age);
}



var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance2 = new Son("zhai",10);
console.log(instance2.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
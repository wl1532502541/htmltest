class PubSub{
    constructor(){
        this.subscribers={}
    }
    //订阅
    subscribe(type,fn){
        let listeners=this.subscribers[type]||[]
        listeners.push(fn)
        this.subscribers[type]=listeners
    }
    //取消订阅
    unsubscribe(type,fn){
        let listeners=this.subscribers[type]
        if(!listeners||listeners.length==0)return
        this.subscribers[type]=listeners.filter((v)=>v!==fn)
    }
    //发布
    publish(type,...args){
        let listeners=this.subscribers[type]
        if(!listeners||listeners.length==0)return 
        this.subscribers[type].forEach(fn => {
            fn(...args)
        });
    }
}

let obj=new PubSub();
obj.subscribe("add",()=>console.log("当add被触发，我被执行"))
obj.subscribe("sub",()=>console.log("当sub被触发，我被执行"))
obj.publish("add")
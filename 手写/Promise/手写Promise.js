const pending = 'pending'
const resolved = 'resolved'
const rejected = 'rejected'
function Promise(fn){
    this.PromiseState=pending //状态
    this.PromiseResult=undefined   //存结果
    this.callbacks=[]   //[{onResolved(){}, onRejected(){}}]

    const resolve=(val)=>{
        if(this.PromiseState==pending){
            this.PromiseState=resolved
            this.PromiseResult=val
            setTimeout(()=>{
                this.resolvedQueue.forEach(cbobj=>{cbobj.onResolved(val)})
            },0)
            
        }
    }
    const reject=(reason)=>{
        if(this.PromiseState==pending){
            this.PromiseState=rejected
            this.PromiseResult=reason
            setTimeout(()=>{
                this.rejectedQueue.forEach(cbobj=>{cbobj.onRejected(reson)})
            },0)
        }
    }

    try{
        fn(resolve,reject)
    }catch(e){
        reject(e)
    }
}

Promise.prototype.then=function(onResolved,onRejected){
    // 规范 如果onResolved或onRejected不是函数需要透传
    //例 Promise.resolve(4).then().then(res=>console.log(res))
    onResolved=typeof onResolved=='function'?onResolved:v=>v;
    onRejected=typeof onRejected=='function'?onRejected:r=>{throw r}

    const handleCallback=(callback,state,result)=>{
        let {onResolved,onRejected,resolve,reject}=callback
        try{
            if(state==resolved){
                typeof onResolved=='function'?resolve(onResolved(result)):resolve(result)
            }else if(state==rejected){
                typeof onRejected=='function'?reject(onRejected(result)):reject(result)
            }
        }catch(e){
            throw e
        }
    }

    // 规范 then必须返回一个新的Promise
    return new Promise((resolve,reject)=>{
        let callback={onResolved,onRejected,resolve,reject}
        if(this.PromiseState==pending){
            this.callbacks.push(callback)
        }else{
            //规范 保证onFulfilled，onRejected异步执行
            //用setTimeout包裹模拟 实际上这里是加到微任务队列
            setTimeout(()=>handleCallback(callback,this.PromiseState,this.PromiseResult),0)
        }
    })
}
Promise.prototype.all=function(arr){
    return new Promise((resolve,reject)=>{
        const result=[],n=arr.length
        let count=0
        for(let i=0;i<n;i++){
            arr[i].then(res=>{
                result[i]=res
                count++
                if(count==n-1){
                    resolve(result)
                }
            },reason=>{
                reject(reason)
            })
        }
    })
}
Promise.prototype.race=function(arr){
    return new Promise((resolve,reject)=>{
        arr.forEach(p=>{
            p.then(resolve,reject)
        })
    })
}
Promise.prototype.catch=function(onRejected){
    return this.then(undefined,onRejected)
}
Promise.prototype.resolve=function(res){
    return new Promise((resolve,reject)=>{
        resolve(res)
    })
}
Promise.prototype.reject=function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}
Promise.prototype.timeout=function(p,time){
    const timerPromise=new Promise((resolve,reject)=>setTimeout(reject,time,new Error('timeout')))
    return Promise.race([p,timerPromise])
}
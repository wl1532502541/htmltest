function limitLoad(utls,handler,limit){
    let sequence = [].concat(urls); //复制urls
    //这一步是为了初始化promises这个“容器”  切割sequence前limit sequence的长度-limit
    let promises = sequence.splice(0,limit).map((url,index)=>{
        return handler(url).then(()=>{
            // 返回下标是为了知道数组中是哪一项最先完成
            return index;
        })
    })

    return sequence.reduce((pCollect,url,currentIndex)=>{
        return pCollect.then(()=>{
            return Promise.race(promises)
        }).then((fastestIndex)=>{
            promises[fastestIndex]=handler(url).then(()=>currentIndex)
        }).catch(err=>{
            console.log(err)
        })
    },Promise.resolve())
    .then(()=>{
        return Promise.all(pCollect)    //剩下的就用Promise.all解决
    })
}

limitLoad(urls,loadImg,3)
.then(res=>{
    console.log('图片全部加载完毕');
    console.log(res)
})
.catch(err=>{
    console.log(err)
})
async function task(){
    await new Promise((res,rej)=>{
        console.log('p1')
        res()
    }).then(()=>{console.log('then1')})
    console.log('a1 finish')
    await new Promise((res,rej)=>{
        console.log('p2')
        res()
    }).then(()=>{console.log('then2')})
    console.log('a2 finish')
    await new Promise((res,rej)=>{
        console.log('p3')
        res()
    }).then(()=>{console.log('then3')})
    console.log('a3 finish')
}
task()
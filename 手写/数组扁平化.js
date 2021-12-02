let arr=[1,[1,2,[2,3]]]
//1 递归
function flat1(arr){
    let newArr=[]
    Object.keys(arr).forEach(key=>{
        if(Array.isArray(arr[key])){
            newArr.push(...flat1(arr[key]))
        }else{
            newArr.push(arr[key])
        }
    })
    return newArr
}
console.log("flat1(arr):",flat1(arr))

Array.prototype.flat=function(){
    let arr=this,res=[]
    for(let key in arr){
        if(Array.isArray(arr[key])){
            res.push(...(arr[key].flat()))
        }else{
            res.push(arr[key])
        }
    }
    return res
}


//2 利用ruduce递归
function flat2(arr){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur)?flat2(cur):cur)
    },[])
}
console.log("flat2(arr):",flat2(arr))

//3 利用扩展运算符
function flat3(arr){
    while(arr.some(val=>Array.isArray(val))){
        arr=[].concat(...arr)
    }
    return arr
}
console.log("flat3(arr):",flat3(arr))

//4 split 和 toString 共同处理      存疑
function flat4(arr){
    return arr.toString().split(',')
}
console.log("flat4(arr):",flat4(arr))

//5 js自带flat
function flat5(arr){
    return arr.flat(Infinity)
}
console.log("flat5(arr):",flat5(arr))

// //6 正则和 JSON 方法共同处理
// function flat6(arr){
//     const str = '[' +JSON.stringify(arr).replace(/(\[|\]/g, '') + ']'
//   return JSON.parse(str);
// }
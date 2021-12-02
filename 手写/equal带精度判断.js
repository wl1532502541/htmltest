console.log(0.1,0.2,0.3)
console.log(0.1+0.2)
console.log(Number.EPSILON)
function euqal(a,b){
    if(a===b)return true
    if(Math.abs(a-b)<Number.EPSILON){
        return true
    }
    return false
}
console.log("euqal(0.1+0.2,0.3):",euqal(0.1+0.2,0.4))
console.log(1/(2**52))
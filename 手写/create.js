function create(proto){
    // let res={}
    // res.__proto__=proto
    // return res
    function F(){}
    F.prototype=proto
    return new F()
}
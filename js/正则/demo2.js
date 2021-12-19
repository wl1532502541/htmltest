// 这里的\2表示第二个括号匹配到的内容
let regex = /(\d{4})([-/.])\d{2}\2\d{2}/

var string1 = '2017-06-12'
var string2 = '2017/06/12'
var string3 = '2017.06.12'
var string4 = '2016-06/12'

console.log(regex.test(string1)) // true
console.log(regex.test(string2)) // true
console.log(regex.test(string3)) // true
console.log(regex.test(string4)) // false
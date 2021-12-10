let price = '123456789'

console.log('第一步，弄出后面第一个逗号')
let Reg1 = /(?=\d{3}$)/
console.log(price.replace(Reg1,','))

console.log('第二步，弄出所有的逗号')
// 这个加号是1或更多，所以匹配了3个数字、6个数字和9个数字的情况
// 关于正则最后的符号:
// i = 忽略大小写区别 ；g = 匹配所有可能的字串 ；m = 多行匹配 ；
let Reg2 = /(?=(\d{3})+$)/g
console.log(price.replace(Reg2,','))

console.log('第三步，去掉首位的逗号')
let Reg3 = /(?!^)(?=\d{3}$)/
console.log(price.replace(Reg3,','))
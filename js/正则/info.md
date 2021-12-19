## 1. 什么是正则表达式（RegExp）？

正则表达式是一种匹配模式，目的是为了字符串的检索和替换。

## 2. 正则表达式能匹配什么？

能匹配字符串和位置

## 3. 匹配位置

```javascript
'hello' === '' + 'h' + '' + 'e' + '' + 'l' + '' + 'l' + '' + 'o' + '' // true\
```

总结：位置是不会占用字符的，也叫做零宽

#### 正则中常用来表示位置的符号主要有哪些？

^、$、\b、\B、?=p、(?!p)、(?<=p)、(?<!p)

#### 位置匹配练习

^，匹配字符串的开头位置

```javascript
let string = 'hello'
console.log(string.replace(/^/, '😄')) // 😄hello
```

$，匹配字符串的结束位置

```javascript
let string = 'hello'
console.log(string.replace(/$/, '😄')) // hello😄
```

\b，匹配单词边界以及\w 和\W 之间的位置

```javascript
'hello world'.replace(/\b/g, '😂') //'😂hello😂 😂world😂'
'hello.world'.replace(/\b/g, '😂') //'😂hello😂.😂world😂'
```

\B，匹配除单词边界以及\w 和\W 之间的位置

```javascript
'helloworld'.replace(/\B/g, '😂') //'h😂e😂l😂l😂o😂w😂o😂r😂l😂d'
```

(?=p)，先行断言匹配 p 后的位置

```javascript
'helloworld'.replace(/(?=world)/g, '😒') //'hello😒world'
```

(?!p)，负向先行断言匹配除了 p 后的位置之外的位置

```javascript
'helloworld'.replace(/(?!world)/g, '😒') //'😒h😒e😒l😒l😒ow😒o😒r😒l😒d😒'
```

(?<=p)，后行断言匹配 p 后的位置

```javascript
'helloworld'.replace(/(?<=world)/g, '😒') //'helloworld😒'
```

(?<!p)，负向后行断言匹配除了 p 后的位置之外的位置

```javascript
'helloworld'.replace(/(?<!world)/g, '😒') //'😒h😒e😒l😒l😒o😒w😒o😒r😒l😒d'
```

## 4.位置匹配实战

##### 数字的千分位分割法

> 将 123456789 转化为 123,456,789
> **第一步，尝试先把后面第一个逗号弄出来**

```javascript
let price = '123456789'
let priceReg = /(?=\d{3}$)/
console.log(price.replace(priceReg, ',')) // 123456,789
```

**第二步，把所有的逗号都弄出来**

要把所有的逗号都弄出来，主要要解决的问题是怎么表示`三个数字一组`,也就是 3 的倍数。我们知道正则中括号可以把一个 p 模式变成一个小整体，所以利用括号的性质，可以这样写

```javascript
let price = '123456789'
let priceReg = /(?=(\d{3})+$)/g
console.log(price.replace(priceReg, ',')) // ,123,456,789
```

**第三步，去掉首位的逗号，**

上面已经基本上实现需求了，但是还不够，首位会出现,那怎么把首位的逗号去除呢？想想前面是不是有一个知识正好满足这个场景？ 没错(?!p)，就是他了，两者结合就是从后往前每三个数字的位置前添加逗号，但是这个位置不能是^首位。

```javascript
let price = '123456789'
let priceReg = /(?!^)(?=(\d{3})+$)/g
console.log(price.replace(priceReg, ',')) // 123,456,789
```

## 5. 匹配字符串

字符串包含中文，字母，下划线，特殊字符

```javascript
\d // 数字
\D // 非数字
\w // [0-9a-zA-Z_]
\W // [^0-9a-zA-Z_]
\s // [\t\v\n\r\f]
\S // [^\t\v\n\r\f]
. // everything
[\u4e00-\u9fa5] //中文
```

##### 量词

```javascript
1. {m,} // 至少出现m次
2. {m} // 出现m次
3. ? // 出现0次或者1次，等价于{0,1}    
4. + // 至少出现1次,等价于{1,} 
5. * // 出现人一次,等价于{0,}
```

##### 贪婪匹配 & 惰性匹配

正则本身是贪婪的，会尽可能的多匹配符合模式的字符

```javascript
let regex = /\d{2,5}/g
let string = '123 1234 12345 123456'
// 贪婪匹配
// string.match(regex) // [ 123, 1234, 12345, 12345 ]

// 惰性匹配
let regex2 = /\d{2,5}?/g
// string.match(regex) // [ 12, 12, 34, 12, 34, 12, 34, 56  ]
```

量词后面加一个？，即变成了惰性匹配

```
贪婪量词        惰性量词
{m,n}            {m,n}?
{m,}             {m,}?
?                ??
+                +?
*                *?
```

#### 多选分支

一个模式可以实现横向和纵向的模糊匹配，而多选分支可以支持多个子模式任选其一，形式是(p1|p2|p3)
let regex = /good|nice/g
let string = 'good idea, nice try.'

```
// string.match(regex) // [ 'good', 'nice' ]

// 注意，用/good|goodbye/去匹配'goodbye' 匹配到的是good
// 因为分支结构是惰性的，前面的匹配上了，后面的就不再尝试了
```

#### 3. 括号的作用（重要）

括号主要是为了分组，每一个括号内都是一个单读的子表达式，最要是为了能够动态的替换数据和捕获数据，以及在复杂的正则表达式中，使其变得优雅。

##### 动态替换数据

```javascript
/*
将以下格式替换为mm/dd/yyy
2021-08-14
*/
// 第一种解法
let reg = /(\d{4})-(\d{2})-(\d{2})/
let string = '2021-08-14'
// 第一种写法
let result1 = string.replace(reg, '$2/$3/$1')
console.log(result1) // 08/14/2021
// 第二种写法
let result2 = string.replace(reg, () => {
  return RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$1
})
console.log(result2) // 08/14/2021
// 第三种写法
let result3 = string.replace(reg, ($0, $1, $2, $3) => {
  return $2 + '/' + $3 + '/' + $1
})
console.log(result3) // 08/14/2021
```

##### 捕获数据

```javascript
let reg = /(ab)+/g
let string = 'ababa abbb ababab'

console.log(string.match(reg)) // ["abab", "ab", "ababab"]
```

##### 反向引用

```javascript
/*
    写一个正则支持以下三种格式
  2016-06-12
  2016/06/12
  2016.06.12
*/
let regex = /(\d{4})([-/.])\d{2}\2\d{2}/

var string1 = '2017-06-12'
var string2 = '2017/06/12'
var string3 = '2017.06.12'
var string4 = '2016-06/12'

console.log(regex.test(string1)) // true
console.log(regex.test(string2)) // true
console.log(regex.test(string3)) // true
console.log(regex.test(string4)) // false
```

## 6. 正则表达式无处不在

- 爬虫
- 虚拟 DOM
- 文件检索
- 代码重构
- AST 语法解析分词

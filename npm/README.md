官方文档：
https://docs.npmjs.com/

极简版：

1.注册 npm 账号

2.在命令行登陆

```
npm login
```

3.初始化包

```
mkdir mypkg
cd mypkg
npm init -y
```

版本控制啥具体细节看官网

写个简单的功能 index.js 里随便 export 一个函数

4.发布包

```
npm publish
```

发布成功以后还会收到一封提醒成功了的邮件

这样发布的是公共包，发布私有包详见官网

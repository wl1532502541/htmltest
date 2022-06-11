const { fstat } = require('fs')
const http = require('http')
const port = 3000
const url = require('url')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    //获取url信息
    //转成对象，里面有pathname、querystring等
    const urlObject = url.parse(req.url)
    const { pathname } = urlObject;
    
    //api开头的是API请求
    if(pathname.startsWith('/api')){
        //再判断路由
        if(pathname === '/api/users'){
            //获取HTTP动词
            const method = req.method;
            if(method === 'GET'){
                //写个假数据
                const resData = [
                    {
                        id:1,
                        name:'小明',
                        age:18
                    },
                    {
                        id:2,
                        name:'小红',
                        age:18
                    }
                ]
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify(resData))
                return;
            }
        }
    }else{
        //path模块获取文件后缀名
        const extName = path.extname(pathname);
        console.log(extName)
        if(extName === '.png'){
            //使用fs模块读取文件
            fs.readFile(path.join(__dirname,pathname),(err,data)=>{
                // res.setHeader('Content-Type','application/x-png');
                res.setHeader('Content-Type','image/jpeg')
                res.write(data)
                res.end()
            })
        }
    }
})

server.listen(port,()=>{
    console.log(`Server is running on http://127.0.0.1:${port}`)
})
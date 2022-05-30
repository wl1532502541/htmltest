# 同一端口同时监听 HTTP 和 HTTPS

## 参考：

https://www.bilibili.com/video/BV1dT4y167Aw?p=1&share_medium=android&share_plat=android&share_session_id=46d49b48-a46b-4b0c-ae94-aef858f87f76&share_source=WEIXIN&share_tag=s_i&timestamp=1653911958&unique_k=RFFoemc

https://stackoverflow.com/questions/22453782/nodejs-http-and-https-over-same-port

## 自签 ca 证书

安装 openssl：https://blog.csdn.net/wuliang20/article/details/121014060

生成 ca 证书：https://www.linkedin.com/pulse/how-create-your-own-self-signed-root-certificate-shankar-gomare

> 1.生成 server.key  
>  openssl genrsa -des3 -out server.key 4096  
>  如果不想要密码就去掉 -des3  
> 2.生成 server.crt  
>  openssl req -x509 -new -nodes -key server.key -sha256 -days 1024 -out server.crt  
> 3.生成 csr.key  
>  openssl genrsa -out csr.key 2048

验证私钥和证书是否匹配：https://www.namecheap.com/support/knowledgebase/article.aspx/9771/2238/apache-error-x509_check_private_keykey-values-mismatch/

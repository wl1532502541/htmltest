function loadImg(url){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.onload = function (){
            console.log("一张图片加载完成");
            resolve(img)
        }
        img.onerror = function(){
            reject(new Error('Could not lioad image at' + url));
        }
        img.src = url
    })
}
loadImg("https://i1.hdslb.com/bfs/face/06ed1e6a433c7669fbd831c8453cb430fe6b089e.jpg@96w_96h_1c_1s.webp").then(res=>{
    console.log(res)
})
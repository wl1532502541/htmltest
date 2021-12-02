var a = [1,3,6,3,23,76,1,34,222,6,456,221];
function bubbleSort(arr){
    const n=arr.length;
    if(n<2)return arr
    for(let i=1;i<n;i++){
        for(let j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                let temp=arr[j]
                arr[j]=arr[j+1]
                arr[j+1]=temp
            }
        }
    }
}
bubbleSort(a)
console.log(a)
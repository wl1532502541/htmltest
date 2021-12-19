/*
c++ api
lower_bound( arr, begin,end,num)：从数组的begin位置到end-1位置二分查找第一个大于或等于num的数字，找到返回该数字的地址，不存在则返回end。通过返回的地址减去起始地址begin,得到找到数字在数组中的下标。

upper_bound( arr, begin,end,num)：从数组的begin位置到end-1位置二分查找第一个大于num的数字，找到返回该数字的地址，不存在则返回end。通过返回的地址减去起始地址begin,得到找到数字在数组中的下标。
————————————————
版权声明：本文为CSDN博主「brandong」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_40160605/article/details/80150252 */

// the first one which >= num
function lower_bound( arr, begin, end, num ) {
  while(begin<=end) {
    let mid = begin + Math.floor((end - begin) / 2)
    if(arr[mid] < num) {
      begin = mid + 1
    }else {
      end = mid - 1 // 这里为什么-1，万一这时mid就是要求的位置怎么办，个人理解如果-1后左边没有符合的数字，最后会由上一个if分支mid+1回到这个位置
    }
  }
  return begin
}

// the first one which > num
function upper_bound( arr, begin, end, num ) {
  while(begin<=end) {
    let mid = begin + Math.floor((end - begin) / 2)
    if(arr[mid] <= num) {
      begin = mid + 1 
    }else {
      end = mid -1
    }
  }
  return begin
}

let testArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13], n = testArr.length
console.log(lower_bound(testArr,0,n,4))
console.log(upper_bound(testArr,0,n,4))
console.log(upper_bound(testArr,0,n,111))

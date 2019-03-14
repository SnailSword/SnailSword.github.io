---
layout:     post
title:      "在Leetcode上刷题的时候学到的东西"
subtitle:   "扶朕起来，朕还能写一个通宵。"
date:       2016-07-28 23:11:00
author:     "Saniac"
header-img: "/img/post-bg-js-version.jpg"
catalog: true
tags:
    - 笔试 
    - 在路上
---

### 颠倒元音字母

> Write a function that takes a string as input and reverse only the vowels of a string.
> 
> Example 1:
> Given s = "hello", return "holle".
> 
> Example 2:
> Given s = "leetcode", return "leotcede".
> 
> Note:
> The vowels does not include the letter "y". 

#### 新技能1：js中交换两个变量

	[a,b]=[b,a];

我的思路是这样的:一个指针从前往后扫，一个从后往前扫，扫到两个都是元音字母的时候，交换，直到两个指针相遇。

参考代码：


```javascript
var reverseVowels = function(s) {
    var vowels = ['a','e','i','o','u'];
    vowels = vowels.concat(vowels.map(function(a){
        return a.toUpperCase();
    }));
    var toArr = s.split('');
    var len = toArr.length;
    var index1 = 0,index2 = len - 1;
    while(index1<index2){
    while((vowels.indexOf(toArr[index1])==-1)&&index1<len){
        index1++;
    }
    while((vowels.indexOf(toArr[index2])==-1)&&index2>-1){
        index2--;
    }
    if(index1>=index2){break;}
    [toArr[index1],toArr[index2]] = [toArr[index2],toArr[index1]];
    index1++;
    index2--;
    }
    return toArr.join('');
};
```
### 打点计时器

> 实现一个打点计时器，要求
> 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
> 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
> 3、第一个数需要立即输出

```javascript
function count(start, end) {
    var i = start;
    console.log(i++);
    function foo(){
        if(i<=end){
            console.log(i++);
            id = setTimeout(foo,100);
        }
        else{
         clearTimeout(id);   
        }
    }
	id = setTimeout(foo,100);
    return {
        cancel: function(){
            clearInterval(id);
       }
    }
}
```

[javascript秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/#other.timeouts)里面建议避免使用setInterval，需要时用回调函数加了setTimeout的setTimeout函数代替。因为:
> 当回调函数的执行被阻塞时，setInterval 仍然会发布更多的回调指令。在很小的定时间隔情况下，这会导致回调函数被堆积起来。

使用计时器还有一点需要注意的就是
> 作为第一个参数的函数将会在全局作用域中执行，因此函数内的 this 将会指向这个全局对象。

所以如果id前面加var定义成局部变量会导致`clearInterval(id)`无法清除定时器。

### 342.判断是否为4的倍数

```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
    a = num.toString(2);
    var reg = /1(00)*/;
    if(reg.test(a))
    return  a.match(reg)[0]===a;
    else 
    {return false;}
};
```

转为2进制，判断是否为一个1，2n个0格式的。

================封================

感觉这么写不太合适，新建了一个仓库专门放leetcode上的题的。
---
layout:     post
title:      "在Leetcode上刷题的时候学到的东西"
subtitle:   "扶朕起来，朕还能写一个通宵。"
date:       2016-07-28 23:11:00
author:     "Saniac"
header-img: "img/post-bg-js-version.jpg"
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



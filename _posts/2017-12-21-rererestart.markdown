---
layout:     post
title:      "两道leetCode题和一个问题"
subtitle:   ""
date:       2017-12-21 15:54:00
author:     "Saniac"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - leetcode
---

leetcode #168 Excel Sheet Column Title

>Given a positive integer, return its corresponding column title as appear in an Excel sheet.

```javascript
/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    let getChar = i => String.fromCharCode(64+i);
    let result = '';
    while(n){
        let c;
        if(n%26 == 0){
            c = 26;
            n = Math.floor(n/26)-1;
        }else{
            c = n%26;
            n = Math.floor(n/26);
        }
        result = getChar(c) + result;
    }
    return result;
};
```

leetcode #179 Largest Number

>Given a list of non negative integers, arrange them such that they form the largest number.
>
>For example, given ```[3, 30, 34, 5, 9]```, the largest formed number is ```9534330```.
>
>Note: The result may be very large, so you need to return a string instead of an integer.

```javascript
/**
 * @param {number[]} nums
 * @return {string}
 */
let largestNumber = function(nums) {
    let allZero = true;
    for (i in nums) {
        if (nums[i] !== 0) {
            allZero = false;
        }
    }
    if (allZero) {
        return '0';
    }
    nums.sort(sortFunction);
    return nums.join('');
};

function sortFunction(a, b) {
    let ab = a + '' + b;
    let ba = b + '' + a;
    return ba - ab;
}
```
这里有一个奇怪的问题我到现在还没想明白是咋回事：```sortFunction```里面如果写成```return ba > ab```，某些case就会不过，如```[41,23,87,55,50,53,18,9,39,63,35,33,54,25,26,49,74,61,32,81,97,99,38,96,22,95,35,57,80,80,16,22,17,13,89,11,75,98,57,81,69,8,10,85,13,49,66,94,80,25,13,85,55,12,87,50,28,96,80,43,10,24,88,52,16,92,61,28,26,78,28,28,16,1,56,31,47,85,27,30,85,2,30,51,84,50,3,14,97,9,91,90,63,90,92,89,76,76,67,55]```。
---
layout:     post
title:      "两道leetcode"
subtitle:   "不要再拖延啦"
date:       2017-12-21 15:54:00
author:     "Saniac"
header-img: "/img/post-bg-js-version.jpg"
catalog: true
tags:
    - leetcode
---

leetcode #168 Excel Sheet Column Title

> Given a positive integer, return its corresponding column title as appear in an Excel sheet.

```javascript
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

> Given a list of non negative integers, arrange them such that they form the largest number.
>
> For example, given ```[3, 30, 34, 5, 9]```, the largest formed number is ```9534330```.
>
> Note: The result may be very large, so you need to return a string instead of an integer.

```javascript
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
---
layout:     post
title:      "闭包的内存泄漏问题"
subtitle:   "不怕渗漏更安心，自由做自我。"
date:       2016-08-24 23:52:00
author:     "Saniac"
header-img: "img/post-bg-promise.jpg"
catalog: true
tags:
    - 闭包
    - js
---

### 内存泄漏的例子

```javascript
window.onload = function(){
    var el = document.getElementById("id");
    el.onclick = function(){
        alert(el.id);
    }
}
```
el的onclick属性中的匿名函数对象有对el的引用，这样就导致了循环引用。

由于js的垃圾回收机制，这种循环引用不会被回收。




























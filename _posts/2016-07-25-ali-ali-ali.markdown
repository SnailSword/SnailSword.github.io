---
layout:     post
title:      "一些前端笔试题及仅供参考的个人解析"
subtitle:   "连跑带颠吧，骚年！"
date:       2016-07-25 16:17:00
author:     "Saniac"
header-img: "/img/post-bg-2015.jpg"
catalog: true
tags:
    - 笔试 
    - 在路上
---

题目及部分思路来自[这里](https://segmentfault.com/a/1190000002638818)，[这里](http://hao.jser.com/archive/5225/),以及[这里](https://github.com/topview-frontend/campus-recruitment/blob/master/written/frontend_online_examination.md)。

### 1.选择符合预期的运行结果 ###

```javascript	
function f1() {
console.time('time span');
}

function f2() {
console.timeEnd('time span');
}

setTimeout(f1, 100);
setTimeout(f2, 200);

function waitForMs(n) {
	var now = Date.now();
    while (Date.now() - now < n) {}
}

waitForMs(500);
```

a.time span:700.077ms

b.time span:0.066ms

c.time span:500.077ms

d.time span:100.077ms

waitForMs函数要一直卡在那个循环等500ms。本来f1和f2要分别在100ms和200ms执行，但是waitForMs先执行且要等500ms,waitForMs执行之后，f1 f2就立即执行了，所以时间差应该选最小的那个。b选项最合理。

这里还有一个疑问，就是当我运行
	
```javascript
function f1() {
console.time('time span');
}

function f2() {
console.timeEnd('time span');
}

setTimeout(f1, 100);
setTimeout(f2, 200);
```

的时候，在chrome里调试不知道为什么输出每次都比前一次多2ms,而且只运行这段代码之后再运行上面的全部代码就会没有输出，不知道是什么原因导致的。

### 2.选择结果为真的表达式 ###

a.null instanceof Object

b.null == undefined

c.NaN == NaN

d.false == undefined

写一个小玩意看看js里这些蛋疼的'=='相关：

```javascript
var Arr = [null,undefined,0,'0','',NaN,true,false];
var len = Arr.length;
for (var i in Arr){
    for(var j in Arr){
        if(Arr[i]==Arr[j]){
            console.log(Arr[i] + '==' + Arr[j]);
        }
        else{
            console.log(Arr[i] + '!=' + Arr[j]);
        }
    }
}
```

前两天看了一篇文章专门说'=='的文章:[通过一张简单的图，让你彻底地、永久地搞懂JS的==运算](https://segmentfault.com/a/1190000006012804?utm_source=tuicool&utm_medium=referral),他是这么解释null==undefined的:

>JavaScript中的undefined和null是另一个经常让我们崩溃的地方。通常它被认为是一个设计缺陷，这一点我们不去深究。不过我曾听说，JavaScript的作者最初是这样想的：
>
>>假如你打算把一个变量赋予对象类型的值，但是现在还没有赋值，那么你可以用null表示此时的状态(证据之一就是typeof null 的结果是'object')；相反，假如你打算把一个变量赋予原始类型的值，但是现在还没有赋值，那么你可以用undefined表示此时的状态。
>
>不管这个传闻是否可信，它们两者做==比较的结果是true是很合理的。

### 3.选择符合预期的执行结果 ###

```javascript
var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
```


a.Goodbye Jack

b.Hello Jack

c.Hello undefined

d.Hello World

运行到那个IIFE的if时，name的值是undefined，不信你看:

![chrome调试截图](/SnailSword.github.io/img/in-post/post-js-version/01.JPG 'chrome调试截图')

这是因为IIFE中的 `var name` 声明提升，到if前面了，相当于在if前面 `var name = undefined`。

### 4.选择描述正确的选项

a.事件流包括两个阶段：事件捕获阶段、事件冒泡阶段

b.IE跟标准浏览器对于DOM事件流实现不一样

c.假设parentEle是childEle的父节点，绑定事件：parentEle.addEventListener("click", fn1, false)和childEle.addEventListener("click", fn2,false),当点击childEle的时候fn1将先于fn2触发

d.addEventListener第三个参数true代表支持捕获，false代表不支持捕获

本题讲解部分引用均摘自阮一峰大大的 [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)。

>当一个事件发生以后，它会在不同的DOM节点之间传播（propagation）。这种传播分成三个阶段：
>
> 
> 1.从window对象传导到目标节点，称为“捕获阶段”（capture phase）。
>
> 2.在目标节点上触发，称为“目标阶段”（target phase）。
>
> 3.从目标节点传导回window对象，称为“冒泡阶段”（bubbling phase）。

里面也有讲到关于addEventListener的第三个参数：

> addEventListener方法用于在当前节点或对象上，定义一个特定事件的监听函数。
> 
> target.addEventListener(type, listener[, useCapture]);
> 
> 上面是使用格式，addEventListener方法接受三个参数。
> 
> 
> * type，事件名称，大小写不敏感。
> 
> * listener，监听函数。指定事件发生时，会调用该监听函数。
> 
> * useCapture，监听函数是否在捕获阶段（capture）触发。该参数是一个布尔值，默认为false（表示监听函数只在冒泡阶段被**触发**）。老式浏览器规定该参数必写，较新版本的浏览器允许该参数可选。为了保持兼容，建议总是写上该参数。

c选项中，`parentEle.addEventListener("click", fn1, false)`和`childEle.addEventListener("click", fn2,false)`都是绑定在冒泡阶段的事件，所以子元素的事件先于父元素的被触发。

d选项中，第三个参数并不是表示是否支持而是表示绑定于哪个阶段，IE之外的浏览器几乎都支持捕获和冒泡。

插播一个关于事件的三个阶段的小demo：

> 假设div节点之中嵌套一个p节点。
> 
>     <div>
>      <p>Click Me</p>
>     </div>
> 
> 如果对这两个节点的click事件都设定监听函数，则click事件会被触发四次。
> 
>     var phases = {
>       1: 'capture',
>       2: 'target',
>       3: 'bubble'
>     };
>     
>     var div = document.querySelector('div');
>     var p = document.querySelector('p');
>     
>     div.addEventListener('click', callback, true);
>     p.addEventListener('click', callback, true);
>     div.addEventListener('click', callback, false);
>     p.addEventListener('click', callback, false);
>     
>     function callback(event) {
>       var tag = event.currentTarget.tagName;
>       var phase = phases[event.eventPhase];
>       console.log("Tag: '" + tag + "'. EventPhase: '" + phase + "'");
>     }
>     
>     // 点击以后的结果
>     // Tag: 'DIV'. EventPhase: 'capture'
>     // Tag: 'P'. EventPhase: 'target'
>     // Tag: 'P'. EventPhase: 'target'
>     // Tag: 'DIV'. EventPhase: 'bubble'
> 
> 上面代码表示，click事件被触发了四次：p节点的捕获阶段和冒泡阶段各1次，div节点的捕获阶段和冒泡阶段各1次。
> 
>     捕获阶段：事件从div向p传播时，触发div的click事件；
>     目标阶段：事件从div到达p时，触发p的click事件；
>     目标阶段：事件离开p时，触发p的click事件；
>     冒泡阶段：事件从p传回div时，再次触发div的click事件。

###5.预期的输出结果

```javascript
     var foo = 1;
     function main(){
         alert(foo);
         var foo = 2;
         alert(this.foo);
         this.foo = 3;
      }
     main(); 
     new main();
```

依次弹出 undefined 1 undefined undefined。

执行main()时由于形成一个新的作用域，`var foo = 2` 声明提升到第一个alert前面，造成了alert的时候main作用域中存在 `foo` 变量，就不会沿着作用域链往上找到外层的 `foo`，所以弹出undefined,而执行main()的时候，由于是window调用的，所以*`this.foo` 中的 `this` 指向window* ，所以第二个弹出1.

而执行new main()的时候，new干了四件事(摘自Javascript高级程序设计)：

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

所以在两个alert上他与不加new唯一的不同就是：this的指向不同，前者指向window,后者指向新建的对象。不加new的时候能弹出1是因为我们预先在全局里var了foo为1，而new出的对象中没有foo这个属性，所以两个都弹出undefined.
---
layout:     post
title:      "一些前端笔试题及仅供参考的个人解析"
subtitle:   "连跑带颠吧，骚年！"
date:       2016-07-25 16:17:00
author:     "Saniac"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 笔试 
    - 在路上
---

题目及部分思路来自[这里](https://segmentfault.com/a/1190000002638818)，[这里](http://hao.jser.com/archive/5225/),以及[这里](https://github.com/topview-frontend/campus-recruitment/blob/master/written/frontend_online_examination.md)。

###1.选择符合预期的运行结果

Javascript:
	
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

a.time span:700.077ms

b.time span:0.066ms

c.time span:500.077ms

d.time span:100.077ms

waitForMs函数要一直卡在那个循环等500ms。本来f1和f2要分别在100ms和200ms执行，但是waitForMs先执行且要等500ms,waitForMs执行之后，f1 f2就立即执行了，所以时间差应该选最小的那个。b选项最合理。

这里还有一个疑问，就是当我运行
	
	function f1() {
    console.time('time span');
	}

	function f2() {
    console.timeEnd('time span');
	}

	setTimeout(f1, 100);
	setTimeout(f2, 200);

的时候，在chrome里调试不知道为什么输出每次都比前一次多2ms,而且只运行这段代码之后再运行上面的全部代码就会没有输出，不知道是什么原因导致的。

###2.选择结果为真的表达式

a.null instanceof Object

b.null == undefined

c.NaN == NaN

d.false == undefined

写一个小玩意看看js里这些蛋疼的'=='相关：

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


前两天看了一篇文章专门说'=='的文章:[通过一张简单的图，让你彻底地、永久地搞懂JS的==运算](https://segmentfault.com/a/1190000006012804?utm_source=tuicool&utm_medium=referral),他是这么解释null==undefined的:
>JavaScript中的undefined和null是另一个经常让我们崩溃的地方。通常它被认为是一个设计缺陷，这一点我们不去深究。不过我曾听说，JavaScript的作者最初是这样想的：

>>假如你打算把一个变量赋予对象类型的值，但是现在还没有赋值，那么你可以用null表示此时的状态(证据之一就是typeof null 的结果是'object')；相反，假如你打算把一个变量赋予原始类型的值，但是现在还没有赋值，那么你可以用undefined表示此时的状态。

>不管这个传闻是否可信，它们两者做==比较的结果是true是很合理的。

###3.选择符合预期的执行结果

	var name = 'World!';
	(function () {
	  if (typeof name === 'undefined') {
	    var name = 'Jack';
	    console.log('Goodbye ' + name);
	  } else {
	    console.log('Hello ' + name);
	  }
	})();



a.Goodbye Jack

b.Hello Jack

c.Hello undefined

d.Hello World


---
layout:     post
title:      "Birth Of My Blog"
subtitle:   " \"Hello World, Hello Blog\""
date:       2016-06-07 14:14:00
author:     "Saniac"
header-img: "/img/post-bg-2015.jpg"
catalog: true
tags:
    - jekyll
    - Github pages
    - 一个开始
---

> “Yeah It's on. ”


## 前言

终于弄好了这样一个地方了，好想叫他技术博客呀。

用的是[黄玄](https://github.com/huxpro)大大的模板，这个模板项目的github地址是[https://github.com/Huxpro/huxblog-boilerplate](https://github.com/Huxpro/huxblog-boilerplate)，谢谢每一个愿意无私分享，使这个世界变得越来越好越来越有爱的人们。他的另一个项目[演说](yanshuo.io)也很厉害，是一个云PPT，个人认为非常实用，感兴趣的话可以关注一下。


<p id = "build"></p>
---

## 正文

第一篇博客写一下搭建过程和遇到的坑吧

首先引用一下原博中[GitHub Pages](https://pages.github.com/) + [Jekyll](http://jekyllrb.com/)优点：

>* **Markdown** 带来的优雅写作体验
* 非常熟悉的 Git workflow ，**Git Commit 即 Blog Post**
* 利用 GitHub Pages 的域名和免费无限空间，不用自己折腾主机
* 如果需要自定义域名，也只需要简单改改 DNS 加个 CNAME 就好了
* Jekyll 的自定制非常容易，基本就是个模版引擎

简单的说就是 **无限流量无限空间编辑方便还不要钱** 。

---

整个过程基本都是参照[使用jekyll建立个人网站](ytysj.github.io/blog/myblog3)做的，过程十分详细。

简要说明一下：

* 从[ruby官网](rubyinstaller.org/downloads/)下载并安装ruby和DevKit

* 进入DevKit目录，摁住shift右键，在此处打开命令行，输入如下命令

```
ruby dk.rb init   #初始化
ruby dk.rb reviewruby   #检查
dk.rb install    #安装
```

* 来到第一个坑，gem在墙外面，而且是翻了墙也连不上的那种，国内镜像有[淘宝镜像](https://ruby.taobao.org/)和[Ruby China镜像](https://gems.ruby-china.org),但是昨天弄的时候两个都不好用，经过各种尝试，基本上网上能查到的报错情况都经历了，最终成功的方法是：用[Ruby China镜像](https://gems.ruby-china.org),网站下面有提示，如果遇到 SSL 证书问题，你又无法解决，请直接用 http://gems.ruby-china.org 避免 SSL 的问题。但改了之后还是报错，最后我把家里的wifi断开，连上手机发的热点………………居然成功了…………


* 成功的标志是

```
gem sources -l

*** CURRENT SOURCES ***

https://ruby.taobao.org #这里只有你用的那个镜像

```


* 然后终于可以愉快地gem install了

```

gem install rails
gem install jekyll
gem install rdiscount
```


* 在github新建一个名为username.github.io的repository，这里的username必须是github的username，然后把它clone到本地，把选好的模板放在里面。
* 在本地目录里打开命令行窗口，执行

```
jekyll serve

```
就可以在本地运行了。

* 第二个坑来了，这里一般会报错，4000端口被其他程序占用。以管理员身份运行命令行程序

```
netstat -ano #在列表里找出占用4000端口的进程的PID(最后一列)假设是3098
taskkill /T /F /PID 3098 #结束占用4000端口的进程

```

* 改好之后，push上去，就可以在直接在username.github.io中看到改好的博客了。
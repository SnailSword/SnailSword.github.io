---
layout:     post
title:      "Leetcode二叉树相关题目-JS"
subtitle:   "二叉树上二叉果，二叉树下你和我。"
date:       2016-07-29 17:11:00
author:     "Saniac"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - 笔试 
    - 在路上
---

### 102 Binary Tree Level Order Traversal

> Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
> 
> For example:
> Given binary tree [3,9,20,null,null,15,7],
> 
>         3
>        / \
>       9  20
>         /  \
>        15   7
>    
> return its level order traversal as:
> 
>     [
>       [3],
>       [9,20],
>       [15,7]
>     ]

我初来乍到不懂规矩，以为输入的是[3,9,20,null,null,15,7]这样一个数组，就写了一个先判断二叉树深度再把每一层扎堆的函数，我觉得有点创造性的地方就是__判断树的深度的时候，我把他的数组长度转成二进制字符串，然后求字符串长度了。__

```javascript
var levelOrder = function(root) {
    var len = root.length;
    Ejz = len.toString(2).length;
    var res=[];
    for(var i=0;i<Ejz-1;i++){
        res.push(root.splice(0,Math.pow(2,i)));
    }
    res.push(root);
    return res;
};
```

后来发现他输入的是树的根节点，而且我也不是道他是怎么做到的，用`Object.prototype.toString.call()`显示出的是Object，但是return出来显示的是[3,9,20,null,null,15,7]这样的数组形式。

搞清楚他数组里的每一个节点是`真·节点`之后，我仔细学习了一下二叉树的知识，然后牛客网上有个[免费试听的视频](http://www.nowcoder.com/courses/1/1/1)刚好讲了有行号信息的二叉树该怎么打印，讲得很清楚，虽然语速有点快，但是多听几遍还是能懂的(唯一不懂的就是不知道为啥讲这种数据结构的课要录着老师讲，明明可以多腾一半地方出来给板书和演示动画啥的)。

正常优先广度的遍历，是每个节点进队列，然后出队列的时候它的子节点进队列。
如果要带有行数信息，就定义两个变量，一个记录当前所打印行的最后一个节点(这里用的last)，一个要记录下一行的最后一个节点(这里用的nlast)，在出队列过程中，nlast指向每一个新入队列的节点，这样就可以使出队列时的当出到last的时候，nlast指向下一行的最后一个节点，然后再把nlast赋给last,说起来有点绕，还是看代码吧。

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(root){
    var last = root;
    var nlast;
    var cur;
    var queue = [];
    var res = [[]];
    queue.unshift(root);
    while(queue.length>0){
        cur = queue.pop();
        res[res.length-1].push(cur);
        var temp = [cur.left,cur.right];
        for(var j in temp){
            if(temp[j]){
                queue.unshift(temp[j]);
                nlast = temp[j];
            }
        }
        if(cur===last){
            res.push([]);
            last = nlast;
        }
    }
    if(res[res.length-1].length===0){
        res.pop();
    }
    for(var i in res){
        res[i]=res[i].map(function(item,index,array){
            return item.val;
        });
    }
    return res;}
    return [];
};
```

### 226 二叉树反转大法

    Invert a binary tree.
    
         4
       /   \
      2     7
     / \   / \
    1   3 6   9

    to
         4
       /   \
      7     2
     / \   / \
    9   6 3   1

我的思路是用递归交换每一个树的左右节点：

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root){
        [root.left,root.right]=[root.right,root.left];
        invertTree(root.right);
        invertTree(root.left);
    }
    return root;
};
```
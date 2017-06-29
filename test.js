function asyncOneByOne(arr) {
    var promise = Promise.resolve();
    var res = promise.then(arr[0]);
    var callback = function () {

    }
    for(var i=1;i<arr.length;i++){
        res = res.then(arr[i](callback));
    }
    return res;
}
function one(callback) {
    setTimeout(function(){
               console.log('first');
               callback();  }, 200); }
function two(callback) {
    setTimeout(function(){
               console.log('second');
               callback();  }, 0); }
        asyncOneByOne([one, two]);
        // will print
        // > first
        // > second

var isIE = function(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}
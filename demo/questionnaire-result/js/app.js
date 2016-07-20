/**
 * Created by Saniac on 2016/7/18.
 */
DATA = {
    1:{
        '西班牙巴塞罗那':8,
        '美国纽约':2,
        '意大利米兰':5,
        '希腊雅典':2,
        '中国南海':7
    },
    2:{
        '选项1':10,
        '选项2':1,
        '选项3':1,
        '选项4':1
    },
    3:{
        '选项1':2,
        '选项2':0,
        '选项3':3,
        '选项4':2,
        '选项5':6,
        '选项6':5
    },
    4:{
        '<img src="img/option1.png">':5,
        '<img src="img/option2.png">':6,
        '<img src="img/option3.png">':3,
        '<img src="img/option4.png">':7
    }
}
$(document).ready(function () {
    // var bcc1 = new BarCellCom();
    // bcc1.addCell();
    $('.zf-quest-list').each(
        function (index,value) {
            var bcc = new BarCellCom(DATA[index+1]);
            bcc.addCell(value);
        }
    );
});

function BarCellCom(opts) {
    this.opts = opts;
    this.sum = 0;
    for(var i in opts){
        this.sum += opts[i];
    }
    this.addCell = function (ele) {
        for(var i in opts){
            var cell = $('<div class="zf-bar-cell"></div>')
            var cellP = $('<p class="ql-option"></p>').html(i);
            if(i.substr(0,4)=='<img'){
                cellP.css('margin-bottom','5px');
            }
            var cellPercent = $('<a></a>').text(((opts[i]/this.sum)*100).toFixed(1)+'%');
            var CC = parseInt((opts[i]/this.sum)*100/10);
            // var length = $('body').width()*0.9;
            var cellB = $('<div class="ql-bar"></div>').css('width',(opts[i]/this.sum)*100+'%');
            switch (CC){
                case 0:
                    if(opts[i]==0){
                        cellPercent.css('color','#7f8c8d');
                        cellPercent.css('margin-left','2px');
                    }
                    cellB.css('background-color','#c0392b');
                    break;
                case 1:
                    cellB.css('background-color','#e67e22');
                    break;
                case 2:
                    cellB.css('background-color','#f1c40f');
                    break;
                case 3:
                    cellB.css('background-color','#27ae60');
                    break;
                case 4:
                    cellB.css('background-color','#1abc9c');
                    break;
                case 5:
                    cellB.css('background-color','#27ae60');
                    break;
                default:
                    cellB.css('background-color','#27ae60');
            }

            cellB.append(cellPercent);
            var cellPo = '<div class="ql-points">'+ opts[i] +'票</div>';
            cell.append(cellP,cellB,cellPo);
            $(ele).append(cell);
        }
    }
}

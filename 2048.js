var Score = 0;
var over = true;
var move = true;
var a = new Array();

for(var i = 0; i < 4; i++){           //初始化为0
    a[i] = new Array();
    for(var j = 0; j < 4; j++){
        a[i][j] = 0;
    }
}

function game_over() {                 //判断游戏是否结束
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(a[i][j] == 0){
                over = false;
                break;
            }
        }
    }
}

function random() {                      //随机产生数字
    game_over();
    if(over){
        alert("Game Over!");
        return;
    }
    if(move){
        while(1){
            var ran = Math.floor(Math.random() * 16);     //0-15
            var i = Math.floor(ran / 4);                  //0-3
            var j = Math.floor(ran % 4);                  //0-3
            if(a[i][j] === 0){
                a[i][j] = Math.floor(Math.random() * 2 + 1) * 2;          //随机取到2或4 **Math.random()取不到1
                over = true;
                move = false;
                break;
            }
        }                                      //遇到break跳出循环
    }
}

function Background(num) {
    switch (num){
        case 0:
            return '#ccc0b3';
        case 2:
            return '#eee4da';
        case 4:
            return '#ede0c8';
        case 8:
            return '#f2b179';
        case 16:
            return '#f59563';
        case 32:
            return '#f67c5f';
        case 64:
            return '#f65e3b';
        case 128:
            return '#edcf72';
        case 256:
            return '#edcc61';
        case 512:
            return '#9c0';
        case 1024:
            return '#33b5e5';
        case 2048:
            return '#09c';
        case 4096:
            return '#a6c';
        case 8192:
            return '#93c';
    }
}
function show() {                        //页面展示
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $('#grid_cell_'+ i + '_' + j).removeClass();                       //移动格子后不改变原来的颜色
            $('#grid_cell_'+ i + '_' + j).addClass('number grid_cell');
            if(a[i][j] == 0){
                $('#grid_cell_'+ i + '_' + j).html('');
            }
            else{
                $('#grid_cell_'+ i + '_' + j).html(a[i][j]);
            }
            $('#grid_cell_'+ i + '_' + j).css('background-color',Background(a[i][j]));
        }
    }
    $('#score').html(Score);
}

function UpMove(j) {
    for(var i = 3; i > 0; i--){
        if(a[i][j] && !a[i-1][j]){
            a[i-1][j] = a[i][j];
            a[i][j] = 0;
            move = true;                               //还能移动游戏未结束
            UpMove(j);
        }
    }
}

function UpScore(j) {                                 //计算分数
    for(var i = 0; i < 3; i++){
        if(a[i][j] && a[i][j] === a[i+1][j]){
            a[i][j] = a[i+1][j] * 2;
            Score += a[i][j];
            a[i+1][j] = 0;
            move = true;                              //两数合并游戏未结束
            UpMove(j);
        }
    }
}

function DownMove(j) {
    for(var i = 0; i < 3; i++){
        if(a[i][j] && !a[i+1][j]){
            a[i+1][j] = a[i][j];
            a[i][j] = 0;
            move = true;
            DownMove(j);
        }
    }
}

function DownScore(j) {
    for(var i = 3; i > 0; i--){
        if(a[i][j] && a[i][j] === a[i-1][j]){
            a[i][j] = a[i-1][j] * 2;
            Score += a[i][j];
            a[i-1][j] = 0;
            move = true;
            DownMove(j);
        }
    }
}

function LeftMove(i) {
    for(var j = 3; j > 0; j--){
        if(a[i][j] && !a[i][j-1]){
            a[i][j-1] = a[i][j];
            a[i][j] = 0;
            move = true;
            LeftMove(i);
        }
    }
}

function LeftScore(i) {
    for(var j = 0; j < 3; j++){
        if(a[i][j] && a[i][j] === a[i][j+1]){
            a[i][j] = a[i][j+1] * 2;
            Score += a[i][j];
            a[i][j+1] = 0;
            move = true;
            LeftMove(i);
        }
    }
}

function RightMove(i) {
    for(var j = 0; j < 3; j++){
        if(a[i][j] && !a[i][j+1]){
            a[i][j+1] = a[i][j];
            a[i][j] = 0;
            move = true;
            RightMove(i);
        }
    }
}

function RightScore(i) {
    for(var j = 3; j > 0; j--){
        if(a[i][j] && a[i][j] === a[i][j-1]){
            a[i][j] = a[i][j-1] * 2;
            Score += a[i][j];
            a[i][j-1] = 0;
            move = true;
            RightMove(i);
        }
    }
}

function up() {                                                    //向上移动及一系列变化
    for(var j = 0; j < 4; j++)
        UpMove(j);
    for(var j = 0; j < 4; j++)
        UpScore(j);
    random();
    show();
}

function down() {                                                   //向下移动及一系列变化
    for(var j = 0; j < 4; j++)
        DownMove(j);
    for(var j = 0; j < 4; j++)
        DownScore(j);
    random();
    show();
}

function left() {                                                   //向左移动及一系列变化
    for(var i = 0; i < 4; i++)
        LeftMove(i);
    for(var i = 0; i < 4; i++)
        LeftScore(i);
    random();
    show();
}

function right() {                                                   //向右移动及一系列变化
    for(var i = 0; i < 4; i++)
        RightMove(i);
    for(var i = 0; i < 4; i++)
        RightScore(i);
    random();
    show();
}

$(document).ready(function () {                                      //开始就产生两个随机数
    var random = Math.floor(Math.random() * 16);
    var i = Math.floor(random / 4);
    var j = Math.floor(random % 4);                                  //不要两个都用/或%
    a[i][j] = 2;
    random = Math.floor(Math.random() * 16);
    var m = Math.floor(random / 4);
    var n = Math.floor(random % 4);
    if(m===i && n===j)
        a[m+1][n+1] = 2;
    else
        a[m][n] = 2;
    show();
    $(document).keyup(function (a) {
        if(a.keyCode == 37)
            left();
        if(a.keyCode == 38)
            up();
        if(a.keyCode == 39)
            right();
        if(a.keyCode == 40)
            down();
    });
});
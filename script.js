var Ball = (function() {

    function Ball(context, color, corX, corY, radius) {
        this.context = context;
        this.color = color;
        this.corX = corX;
        this.corY = corY;
        this.radius = radius;
    }
    
    Ball.prototype.draw = function() {
        //_clear();
        this.context.beginPath();
        this.context.arc(this.corX, this.corY, this.radius,0,2*Math.PI);
        this.context.shadowBlur = 30;
        this.context.fillStyle = this.color;
        this.context.shadowColor = this.color;
        this.context.fill();
        this.context.closePath();
    }
    
    Ball.prototype.move = function(moveToX, moveToY) {
        this.context.beginPath();
        this.context.arc(moveToX, moveToY, this.radius,0,2*Math.PI);
        this.context.shadowBlur = 30;
        this.context.fillStyle = this.color;
        this.context.shadowColor = this.color;
        this.context.fill();
        this.context.closePath();
    }
    /*var _clear = function() {
       c ontext.clearRect(0,0,_canvas.width,_canvas._height);
    }*/
    return Ball;
}());

function randomBoolean() {
    if(Math.random() < 0.5) {
        return false;
    }
    else {
        return true;
    }
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var ballStatus = [];
var radius = 10;
var color = ["red", "blue", "green", "yellow", "orange", "white", "purple", "aqua", "indigo"]; 
var dx = 10;
var dy = 10;
var timeMove = 40;
canvas.style.backgroundColor = "black";

/*@description : init or add a ball object to the array base on color count*/
for(var i = 0; i < color.length; i++) {
    ballStatus.push({
        x : Math.random() * ((canvas.width-radius) - 0) + 0,
        y : Math.random() * ((canvas.height-radius) - 0) + 0,
        isEndY : randomBoolean(),
        isLeftX : randomBoolean(),
        color : color[i]
    });
}

/*@description : do the animation*/
setInterval(()=> {
    context.clearRect(0,0,canvas.width,canvas.height);
    for(var j = 0; j < ballStatus.length; j++) {
        var obj = ballStatus[j];
        var ball = new Ball(context, obj.color, obj.x, obj.y, radius); 
        //ball.draw();

        /*@description : if isEndY is false move down and if its true move up*/
        if(obj.y + radius < canvas.height) {
            if(obj.y < radius) {
                obj.isEndY = false;    
            }
        }
        else if(obj.y + radius > canvas.height) {
            obj.isEndY = true;
        }

        /*@description : if isLeftX is false move right and if its true move left*/
        if(obj.x + radius < canvas.width) {
            if(obj.x < radius) {
                obj.isLeftX = true;
            }
        
        }
        else if(obj.x + radius > canvas.width) {
            obj.isLeftX = false;
        }

        /*@desciption : do the action move */
        if(obj.isEndY) { 
            obj.y -= dy; 
        }
        else {
            obj.y += dy;
        }
        
        if(obj.isLeftX) {
            obj.x += dx;
        }
        else {
            obj.x -= dx;
        }
        ball.move(obj.x, obj.y);
    }
},timeMove);
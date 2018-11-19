var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;//starting position of ball
var y = canvas.height-20;//starting position of ball
var dx = 2;//initial velocity
var dy = -2;//initial velocity
var ballradius=10;
var paddleWidth=100;
var paddleHeight=10;
var paddleX=(canvas.width-paddleWidth)/2;//gives x coordinate of paddle
var paddleY = (canvas.height-paddleHeight);// y coordinate
var leftpressed =false;//key left arrow
var rightpressed=false;// key right arrow
var lives=3;
var brickColumn=5;
var brickRow=7;
var brickWidth=150;
var brickHeight=50;
var brickPadding=6;
document.addEventListener("keydown", down,);
document.addEventListener("keyup", up, );
// function for key control
function down(e) {
if(e.keyCode==37)
    { 
        leftpressed=true;
        //console.log("left");
    }
    
    else if (e.keyCode==39)
        {
            rightpressed=true;
            //console.log("right");
        }
    
        
        
    }
function up(e) {
if(e.keyCode==37)
    {
        leftpressed=false;
        
    }
    
    else if (e.keyCode==39)
        {
            rightpressed=false;
      
        }
}

var brick=[];
for(var i=0;i<brickRow;i++){
    brick[i]=[];
    for(var j=0;j<brickColumn;j++){
brick[i][j]={x:0,y:0,status:1};         
    }
}

function drawBricks() {
    
    for(i=0;i<brickRow;i++){
       for(j=0;j<brickColumn;j++){
         if(brick[i][j].status==1){
            var brickX=i*(brickWidth+brickPadding);
            var brickY=j*(brickHeight+brickPadding);
        brick[i][j].x=brickX;
        brick[i][j].y=brickY;
             
             ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
             ctx.fillStyle="#3F51B" ;
            ctx.fill();
     ctx.closePath();
            }
}
    }
}
    var score=0; 
function collision() {
    for(i=0; i<brickRow; i++) {
        for(j=0; j<brickColumn; j++) {
        
          
            if(brick[i][j].status == 1) {
if(x > brick[i][j].x && x < brick[i][j].x+brickWidth && y > brick[i][j].y && y < brick[i][j].y+brickHeight) {
        
             dy = -dy;
                    brick[i][j].status = 0;
                    score++;
                    if (score==brickColumn*brickRow){
                        alert("you win");
                        document.location.reload();
    }
     }
    }
}
    }
}

function writeScore() {
    ctx.font="20px Quicksand";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("SCORE =" +score, 8 ,350 );
}

function writelives() {
     ctx.font="20px Quicksand";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("LIVES =" +lives, 970 ,350 );
    
}
function gamereset(){
    x=canvas.width/2+paddleWidth/2;
    paddleX=canvas.width/2;
   dy=-dy;
}
        
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballradius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function writegameover() {
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="blue";
    ctx.font="100px Quicksand";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("GAME OVER" , 250,canvas.height/2);
    
}

function paddle() {
    ctx.beginPath();
    ctx.rect(paddleX ,paddleY , paddleWidth ,paddleHeight);
    ctx.fillStyle="#00BCD4"
    ctx.fill();
    ctx.closePath();
}



function draw() {
    //first line to clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // now draw everything    
    if(lives==0)
        {
            writegameover();
        }
    else
        {
    paddle();
    drawBall();
    drawBricks();
    writeScore();
    writelives();
    
    collision();
    
    if (x+dx < ballradius || x+dx > canvas.width-ballradius) {
            console.log("bounce left or right");
            dx = -dx;
        }
    
     if( y + dy < ballradius) {
        dy = -dy;// bounce from top
         console.log("top bounce");
    }
    
    if( (y + dy) > (canvas.height-ballradius-paddleHeight+5))
    {// ball may collide with paddle or may sink
        if(x > paddleX && x < paddleX + paddleWidth)   //y==canvas.height-paddleHeight
        {
            dy = -dy;//bounce from paddle
            console.log("bounce paddle");
        }
        
        
        else {
            lives--;
            gamereset();
//            for(c=0;c<lives;c++){
//            lives--;
//            document.location.reload();
//            if (lives==0);
//                    {
////                        alert("GAME OVER");
//                    }
////                    }
//                console.log("alert");
            }
        }
    
        
    if (leftpressed && paddleX >0) {
         paddleX-=7;// slide left  (6)
     }
    
    else if( rightpressed && paddleX < canvas.width-paddleWidth) {
        paddleX+=7;// slide right
        }
    
    
    
    x += dx;// increases x coordinate of ball
    y += dy;// increases y coordinate of ball
        }
  /*  else{
        writegameover();
        console.log("g6a68m6");
    }
    */
}
setInterval(draw, 10);
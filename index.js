var score=0;
var isstarted=false;
var isspacebar=0;
var obstaclecount=0;
var currentpipe2=1;
var currentpipe=1;
var birdangle=0;
var pipespeed=6;
var timergameID=0;
var obstacleinterval=0;
var obstacleintervallimit=40;
var highestscore=0;
var canstart;
var isday=true;
var pipegap=4.3;
var pipeminheight;


resetgamewindowsize();
initializeGame();
function initializeGame(){
    score=0;
    currentpipe=1;
    currentpipe2=1;
    obstaclecount=0;
    isspacebar=0;
    canstart=true;
    isday=true;
    changebackground();
    obstacleinterval=obstacleintervallimit;
    document.getElementById("obstacles").innerHTML="";
    document.getElementById("scoreboard").innerText="Score: 0";
    document.getElementById("startgame").innerText="Press 'Space bar' to start the game!";
    document.getElementById("bird").style.transform="rotate(0deg)";
    document.getElementById("bird").classList.add("birdanimate");
    document.getElementById("bird").style.top=Math.floor(document.getElementById("gamebox").clientHeight/2)+"px";
}

window.addEventListener("resize",()=>{
    resetgamewindowsize();
});
document.getElementById("gamebox").addEventListener("touchend",function(event){
    event.preventDefault();
});
document.getElementById("gamebox").addEventListener("touchmove",function(event){
    event.preventDefault();
});
document.getElementById("gamebox").addEventListener("dblclick",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchend",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchmove",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("dblclick",function(event){
    event.preventDefault();
});
document.querySelector("body").addEventListener("touchstart",function(event){
    document.getElementById("scoreboard").innerText="tstart";
    event.preventDefault();
});

function resetgamewindowsize(){
    if(window.innerHeight>window.innerWidth){
        var temp=window.innerHeight;
        if(temp<600){
        //document.getElementById("scoreboard").style.top=(temp*10/100)+"px";
        document.getElementById("scoreboard").style.top=(temp*10/100)+"px";
        document.getElementById("gamesetting").style.top=(temp*10/100)+"px";
        document.getElementById("roof").style.top=(temp*20/100)+"px";
        document.getElementById("roof").style.height=(temp*3/100)+"px";
        document.getElementById("gamebox").style.height=(temp*57/100)+"px";
        document.getElementById("gamebox").style.top=(temp*23/100)+"px";
        document.getElementById("floor").style.height=(temp*20/100)+"px";
        document.getElementById("bg1").style.bottom=(temp*20/100)+"px";
        }else{
        temp=(temp-400-19+1);
        
        document.getElementById("scoreboard").style.top=temp/4+"px";
        document.getElementById("gamesetting").style.top=temp/4+"px";
        document.getElementById("roof").style.top=temp/2.5+"px";
        document.getElementById("roof").style.height="19px";
        document.getElementById("gamebox").style.top=temp/2.5+19+"px";
        document.getElementById("gamebox").style.height="400px";
        document.getElementById("floor").style.height=(temp-temp/2.5)+"px";
        document.getElementById("bg1").style.bottom=(temp-temp/2.5)+"px";
        }
    }else{
        document.getElementById("scoreboard").style.top="10vh";
        document.getElementById("gamesetting").style.top="10vh";
        document.getElementById("roof").style.top="20vh";
        document.getElementById("roof").style.height="3vh";
        document.getElementById("gamebox").style.height="57vh";
        document.getElementById("gamebox").style.top="23vh";
        document.getElementById("floor").style.height="20vh";
        document.getElementById("bg1").style.bottom="20vh";
    }
    pipeminheight=document.getElementById("gamebox").offsetHeight*14/100;
}

function startgame(){
new Audio("public/sounds/sfx_wing.ogg").play();
if(timergameID===0){
timergameID=setInterval(game,30);
}
isspacebar=11;
birdangle=-50;
}

document.addEventListener("keypress",function(event){
    if(isstarted && event.key===" "){
            spacebar();
      }
      else{
        if(event.key===" " && canstart){
        document.getElementById("startgame").classList.add("hide");
        isstarted=true;
        startgame();
        }
      }
      if(!canstart){
        initializeGame();
      }
});
document.getElementById("gamebox").addEventListener("mousedown",function(event){
    if(isstarted){
            spacebar();
      }
      else{
        if(canstart){
        document.getElementById("startgame").classList.add("hide");
        isstarted=true;
        startgame();
        }
      }
      if(!canstart){
        initializeGame();
      }
});
document.getElementById("gamebox").addEventListener("touchstart",function(event){
    event.preventDefault();
    if(isstarted){
            spacebar();
      }
      else{
        if(canstart){
        document.getElementById("startgame").classList.add("hide");
        isstarted=true;
        startgame();
        }
      }
      if(!canstart){
        initializeGame();
      }
});

function game(){
if(isstarted){
    if(birdangle<80) birdangle+=4;
    document.getElementById("bird").style.transform="rotate("+birdangle+"deg)";

    if(isspacebar<=0){
    var birdy=((document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1)+(document.getElementById("gamebox").offsetHeight*1/100)-(isspacebar/2)); //(document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1);
    if((birdy+document.getElementById("bird").offsetHeight)>document.getElementById("gamebox").offsetHeight){ 
        birdy=document.getElementById("gamebox").offsetHeight-document.getElementById("bird").offsetHeight;
        document.getElementById("bird").style.top=birdy+"px";
        new Audio("public/sounds/sfx_hit.ogg").play();
        isstarted=false;
        document.getElementById("bird").style.transform="rotate(80deg)";
        document.getElementById("bird").classList.remove("birdanimate");
        gameover();
    }
    document.getElementById("bird").style.top=birdy+"px";
     pipeobstacle();
    }
    else {
        var birdy=((document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1)-(document.getElementById("gamebox").offsetHeight*1.1/100)); //(document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1);
        if(birdy<0)birdy=0;
        document.getElementById("bird").style.top=birdy+"px";
        
     pipeobstacle();
    }
    isspacebar-=1;
}
else{
    if(!canstart){
        var birdy=((document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1)+(document.getElementById("gamebox").offsetHeight*2/100)); //(document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1);
        if((birdy+document.getElementById("bird").offsetHeight)>document.getElementById("gamebox").offsetHeight){ 
            birdy=document.getElementById("gamebox").offsetHeight-document.getElementById("bird").offsetHeight;
        }
        document.getElementById("bird").style.top=birdy+"px";
    }
}
}

function playmusic(){
    new Audio("./public/sounds/sfx_die.ogg").play();
    clearInterval(timergameID);
}

function pipeobstacle(){
    if(obstacleinterval===0){
        obstacleinterval=obstacleintervallimit;
        obstaclecount+=1;
        var gameboxwidth=document.getElementById("gamebox").offsetWidth;
        var gameboxheight=document.getElementById("gamebox").offsetHeight;
        var obstacleheight=Math.floor(Math.random()*(gameboxheight-pipeminheight-document.getElementById("bird").offsetHeight*pipegap));

        if(obstacleheight<pipeminheight) obstacleheight=Math.floor(Math.random()*(gameboxheight-pipeminheight-document.getElementById("bird").offsetHeight*pipegap));
        if(obstacleheight<pipeminheight) obstacleheight=pipeminheight;

        var obstacleheight2=gameboxheight-obstacleheight-(document.getElementById("bird").offsetHeight*pipegap);
        if(!isday){
        var tempstring1="<div id='pipeup"+obstaclecount+"' class='pipeupclass' style='left:"+gameboxwidth+"px;height: "+obstacleheight+"px;'><div id='pipeneckup"+obstaclecount+"' class='pipeedge' style='top: "+(obstacleheight-25)+"px ; transform: scaley(-1);'></div></div>";
        var tempstring2="<div id='pipedown"+obstaclecount+"' class='pipeupclass' style='left:"+gameboxwidth+"px;top: "+(gameboxheight-obstacleheight2)+"px ;height: "+obstacleheight2+"px;'><div id='pipeneckdown"+obstaclecount+"' class='pipeedge'></div></div>";
        }else{   
        var tempstring1="<div id='pipeup"+obstaclecount+"' class='pipeupclassnight' style='left:"+gameboxwidth+"px;height: "+obstacleheight+"px;'><div id='pipeneckup"+obstaclecount+"' class='pipeedgenight' style='top: "+(obstacleheight-25)+"px ; transform: scaley(-1);'></div></div>";
        var tempstring2="<div id='pipedown"+obstaclecount+"' class='pipeupclassnight' style='left:"+gameboxwidth+"px;top: "+(gameboxheight-obstacleheight2)+"px ;height: "+obstacleheight2+"px;'><div id='pipeneckdown"+obstaclecount+"' class='pipeedgenight'></div></div>";
        
        }
        document.getElementById("obstacles").innerHTML=document.getElementById("obstacles").innerHTML+tempstring1+tempstring2;
    }
    else{
        obstacleinterval-=1;
    }
    for(var i=currentpipe;i<=obstaclecount;i++){
        var birdleft=Math.floor(document.getElementById("bird").style.left.toString().slice(0,document.getElementById("bird").style.left.length-2)*1);
        var birdtop=Math.floor(document.getElementById("bird").style.top.toString().slice(0,document.getElementById("bird").style.top.length-2)*1);
        var pipeleft=(document.getElementById("pipeup"+i).style.left.toString().slice(0,document.getElementById("pipeup"+i).style.left.toString().length-2)*1);
        //var pipetop=(document.getElementById("pipeup"+i).style.top.toString().slice(0,document.getElementById("pipeup"+i).style.top.toString().length-2)*1);
        var pipedowntop=(document.getElementById("pipedown"+i).style.top.toString().slice(0,document.getElementById("pipedown"+i).style.top.toString().length-2)*1);

        if((birdleft+document.getElementById("bird").offsetWidth)>=pipeleft && birdleft<=(pipeleft+document.getElementById("pipeup"+i).offsetWidth)){  
            if(birdangle<-10){ 
                if((birdleft+document.getElementById("bird").offsetWidth)>(pipeleft+document.getElementById("pipeup"+i).offsetWidth)){
                    birdtop+=4; 
                }
                else if(birdangle>20){
                    birdtop+=4;
                }
                }
                else if((birdleft+(document.getElementById("bird").offsetWidth/3))>(pipeleft+document.getElementById("pipeup"+i).offsetWidth) && (birdtop+document.getElementById("bird").offsetHeight)>=pipedowntop){
                    birdtop+=3; 
                }else if((birdleft+(document.getElementById("bird").offsetWidth/3))<pipeleft){
                    birdtop+=3; 
                }
            if(birdtop<=document.getElementById("pipeup"+i).offsetHeight|| (birdtop+document.getElementById("bird").offsetHeight)>=pipedowntop){
                isstarted=false;
                document.getElementById("bird").style.transform="rotate(80deg)";
                //console.log("birdtop:",birdtop);
                //console.log("pipetop:",document.getElementById("pipeup"+i).offsetHeight);
                //console.log("birdtop+bird height:",(birdtop+document.getElementById("bird").offsetHeight));
                //console.log("pipedowntop:",pipedowntop);
                new Audio("public/sounds/sfx_hit.ogg").play();
                timergameID=setInterval(playmusic,200);
                document.getElementById("bird").classList.remove("birdanimate");
                gameover();
                break;
            }
            //document.getElementById("scoreboard").innerText="asdf";
        }
        if(Math.floor((pipeleft+document.getElementById("pipeup"+i).offsetWidth))<=birdleft){ 
            score+=1; 
            currentpipe+=1;
            if((score%10)==0){
                changebackground();
            }
            document.getElementById("scoreboard").innerText="Score: "+score;
            new Audio("public/sounds/sfx_point.ogg").play();
        }
        document.getElementById("pipeup"+i).style.left=(pipeleft-pipespeed)+"px";
        document.getElementById("pipedown"+i).style.left=(pipeleft-pipespeed)+"px";
    }
    for(var i=currentpipe2;i<currentpipe;i++){
        var pipeleft=(document.getElementById("pipeup"+i).style.left.toString().slice(0,document.getElementById("pipeup"+i).style.left.toString().length-2)*1);
        if(pipeleft<(document.getElementById("pipeup"+i).offsetWidth*-1)){ 
            currentpipe2+=1;
            document.getElementById("pipeup"+i).remove();
            document.getElementById("pipedown"+i).remove();
            }
            else{
            document.getElementById("pipeup"+i).style.left=(pipeleft-pipespeed)+"px";
            document.getElementById("pipedown"+i).style.left=(pipeleft-pipespeed)+"px";
            }
    }
}
function spacebar(){
    isspacebar=11;
    birdangle=-50;
    new Audio("public/sounds/sfx_wing.ogg").play();
}
function gameover(){
    if(score>highestscore){highestscore=score;}
    document.getElementById("startgame").classList.remove("hide");
    document.getElementById("startgame").innerText="Game Over! Press any key to continue.";
    document.getElementById("startgame").innerHTML="<p class='font'>Score: "+score+"</p><p class='font'>High Score: "+highestscore+"</p>";
    canstart=false;
}
function changebackground(){
    if(isday){
        isday=false;
        document.querySelector("body").style.backgroundColor="#359befa7";
        document.getElementById("floor").style.backgroundImage="url('./public/pic/ground.png')";
        document.getElementById("floor").style.backgroundColor="#d5cf9e";
        document.getElementById("bg1").style.backgroundImage="url('./public/pic/bg.png')";
        document.getElementById("roof").style.backgroundImage="url('./public/pic/brick.png')";
        document.getElementById("sun").classList.remove("suncolor2");
        document.getElementById("sun").classList.add("suncolor1");
        for(var i=currentpipe2;i<=obstaclecount;i++){
            document.getElementById("pipeup"+i).style.backgroundImage="url('./public/pic/pipe1.png')";
            document.getElementById("pipedown"+i).style.backgroundImage="url('./public/pic/pipe1.png')";
            document.getElementById("pipeneckup"+i).style.backgroundImage="url('./public/pic/pipe2.png')";
            document.getElementById("pipeneckdown"+i).style.backgroundImage="url('./public/pic/pipe2.png')";
        }
    }
    else{
        isday=true;
        document.querySelector("body").style.backgroundColor="#263688";
        document.getElementById("floor").style.backgroundImage="url('./public/pic/groundnight.png')";
        document.getElementById("floor").style.backgroundColor="#ac9e90";
        document.getElementById("bg1").style.backgroundImage="url('./public/pic/bgnight.png')";
        document.getElementById("roof").style.backgroundImage="url('./public/pic/bricknight.png')";
        document.getElementById("sun").classList.add("suncolor2");
        document.getElementById("sun").classList.remove("suncolor1");
        document.getElementById("sun").style.backgroundColor="white";
        for(var i=currentpipe2;i<=obstaclecount;i++){
            document.getElementById("pipeup"+i).style.backgroundImage="url('./public/pic/pipe1night.png')";
            document.getElementById("pipedown"+i).style.backgroundImage="url('./public/pic/pipe1night.png')";
            document.getElementById("pipeneckup"+i).style.backgroundImage="url('./public/pic/pipe2night.png')";
            document.getElementById("pipeneckdown"+i).style.backgroundImage="url('./public/pic/pipe2night.png')";
        }
    }
}
function turbo(){
    document.getElementById("btnturbo").blur();
    if(document.getElementById("btnturbo").innerText==="Turbo"){
        //document.getElementById("btnturbo").focus("victoryrobo");
        //document.getElementById("btnturbo").focus(false);
        //document.getElementById("btnhard").focus();
        document.getElementById("btnturbo").innerText="Slow";
        pipespeed=15;
        obstacleintervallimit=23;
    }
    else{
        document.getElementById("btnturbo").innerText="Turbo";
        pipespeed=6;
        obstacleintervallimit=40;
    }
}
function hard(){
    document.getElementById("btnhard").blur();
    if(document.getElementById("btnhard").innerText==="Hard"){
        document.getElementById("btnhard").innerText="Easy";
        pipegap=3.2;
    }
    else{
        document.getElementById("btnhard").innerText="Hard";
        pipegap=4.4;
    }
}
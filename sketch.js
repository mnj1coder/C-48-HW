
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var player;
var imgHuman;
var ImgPlayer,ImgMask,ImgSanitiser,ImgGlove,ImgCOVID;
var SafeGroup;
var GameOver;
var Over;
var GameState = "play";
var score = 0;

function preload()
{
ImgPlayer = loadImage("images HW/Girl22.png");
ImgSanitiser = loadImage("images HW/sanitiser.png");
ImgGlove = loadImage("images HW/Gloves22.png");
ImgMask = loadImage("images HW/mask22.png");
ImgCOVID = loadImage("images HW/COVID22.png");
ImgHuman = loadImage("images HW/OtherHuman22.png");
GameOver = loadImage("images HW/Gameover.jpeg");
}

function setup() {
	createCanvas(800, 700);
   Over = createSprite(400,350,20,20);
   Over.scale = 2
   Over.addImage(GameOver);
   Over.visible = false;
	 player = createSprite(100,100,20,20);
	 player.addImage(ImgPlayer);
   player.scale = 0.3;
    SafeGroup = new Group();
    UnSafeGroup = new Group();
}


function draw() {
  rectMode(CENTER);
  background(0);

  if(GameState == "play"){
    player.x = mouseX;
  player.y = mouseY;
  UnsafeItems();

 SafeItems();




for(var i=0; i<SafeGroup.length; i++){
  if(SafeGroup.get(i)!=null&&SafeGroup.get(i).isTouching(player)){
     SafeGroup.get(i).destroy();
     score = score+2;
  }
}

for(var i=0; i<UnSafeGroup.length; i++){
  if(UnSafeGroup.get(i)!=null&&UnSafeGroup.get(i).isTouching(player)){
     UnSafeGroup.get(i).destroy();
     score = score-2;
  }
}

if(score<0){
  GameState = "end";
  player.destroy();
  SafeGroup.destroyEach();
  UnSafeGroup.destroyEach();
}
  }
  else if(GameState== "end"){
     Over.visible = true;
  }
  

  drawSprites();

  text(score,20,30); 
 
}




function UnsafeItems(){
  console.log("hi");
  if (frameCount% 27 === 0){
 var unsafeItem = createSprite(random(10,790),0,10,10);
 var RandomObject = Math.round(random(1,2));
switch(RandomObject){
  case 1: unsafeItem.addImage(ImgHuman);
  break;
  case 2: unsafeItem.addImage(ImgCOVID);
  break;
}
  unsafeItem.scale = 0.2;
  unsafeItem.velocityY= 4;
  UnSafeGroup.add(unsafeItem);

  }
}

function SafeItems(){
  if (frameCount% 50 === 0){
 var safeItem = createSprite(random(10,790),0,10,10);
 var RandomObject = Math.round(random(1,3));
switch(RandomObject){
  case 1: safeItem.addImage(ImgGlove);
  break;
  case 2: safeItem.addImage(ImgMask);
  break;
  case 3: safeItem.addImage(ImgSanitiser);
  break;
}

safeItem.scale = 0.2;
safeItem.velocityY= 4;
  SafeGroup.add(safeItem);
  
  }
  }







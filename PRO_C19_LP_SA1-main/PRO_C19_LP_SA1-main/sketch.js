var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "serve"
var score
var spookySound
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(300,300)
  ghost.addImage("ghost-standing",ghostImg)
  ghost.scale=0.3
  climbersGroup=new Group()
  doorsGroup=new Group()
  score=0
  ghost.setCollider("rectangle",0,0,200,200);
  ghost.debug = true

}

function draw() {
  background(200);
  if(gameState==="serve"){
    fill("white")
    textSize(30)
    text("press space to play",200,300)

  }
  if(keyDown("Space")){
    gameState="play"
  }

 
 if(gameState==="play"){


  if(keyDown("UP_ARROW")){
    ghost.velocityY=-8
    spookySound.play()
  }
  if(keyDown("LEFT_ARROW"))
{
  ghost.x=ghost.x-5
  spookySound.play()
}
if(keyDown("RIGHT_ARROW"))
{
  ghost.x=ghost.x+5
  spookySound.play()
}
  ghost.velocityY = ghost.velocityY + 1
  if(tower.y > 400){
      tower.y = 300
    }

    spawndoors()
  
  if(climbersGroup.isTouching(ghost)||ghost.y>600){
ghost.velocityY=0
gameState="end"
  }

  if(doorsGroup.isTouching(ghost)){
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    score=score+50
  }

  drawSprites()
  text("score:"+score,550,50)
 
}
 if(gameState==="end"){

    fill("yellow")
    textSize(30)
    text("game over press r to restart",200,300)
    if(keyDown("R")){
      reset()
    }
  }
 
}

function spawndoors(){

  if (frameCount % 100 === 0) {
  
  door = createSprite(300,-50);
  door.addImage("door",doorImg);
door.scale=0.8
door.velocityY=3
door.x=Math.round(random(80,540))
 climber=createSprite(300,10)
 climber.addImage("climber",climberImg)
 climber.scale=0.7

 climber.velocityY=3
 climber.x=door.x
 doorsGroup.add(door)
 climbersGroup.add(climber)
}
}
function reset(){

gameState="serve"
ghost.x=300
ghost.y=300
score = 0

}
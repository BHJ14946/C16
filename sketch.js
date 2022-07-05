
var trex,trex_running;
var edges;
var invisibleground;
var ground,groundimage;
var cloud;
var cloudimage;
var Obstacle;
var Obstacle1, Obstacle2, Obstacle3, Obstacle4, Obstacle5, Obstacle;
var score
var PLAY = 1; var END = 0; var gameState = PLAY;
var cloudsGroup, obstaclesGroup;




function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
 groundimage=loadImage("ground2.png")
 cloudimage = loadImage("cloud.png")

 Obstacle1=loadImage("obstacle1.png")
 Obstacle2=loadImage("obstacle2.png")
 Obstacle3=loadImage("obstacle3.png")
 Obstacle4=loadImage("obstacle4.png")
 Obstacle5=loadImage("obstacle5.png")
 Obstacle6=loadImage("obstacle6.png")
}

function setup(){

  createCanvas(600,200);
  ground = createSprite(200,180,400,20);
  ground.addImage(groundimage)
  invisibleground=createSprite(200,190,400,10)

  invisibleground.visible=false

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges =createEdgeSprites();
  trex.scale = 0.5;
  trex.x =50;
  score=0
  cloudsGroup = new Group(); 
  obstaclesGroup = new Group();
  

}

function draw(){
  background(150);
  text("score: "+score,500,50)
  

  if(gameState === PLAY) 
  { ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    if(ground.x<0){
      ground.x=ground.width/2
          }   
         
          if(keyDown("space") && trex.y>=160) {
            trex.velocityY=-10
          }
          trex.velocityY= trex.velocityY + 0.5
          spawnClouds()
  spawnObstacles()
  if (obstaclesGroup.isTouching(trex)){
    gameState === END
  }
  } 

  
  else if(gameState === END)
  { ground.velocityX = 0; 
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  
  trex.collide(invisibleground);
  
  drawSprites()
}
 function spawnObstacles(){
  if(frameCount %60===0){
    Obstacle=createSprite(600,165,10,40)
    Obstacle.velocityX= -5
    
    
    var ram=Math.round(random(1,6))
  switch(ram){
  case 1:Obstacle.addImage(Obstacle1);
  break;
  case 2:Obstacle.addImage(Obstacle2);
  break;
  case 3:Obstacle.addImage(Obstacle3);
  break;
  case 4:Obstacle.addImage(Obstacle4);
  break;
  case 5:Obstacle.addImage(Obstacle5);
  break;
  case 6:Obstacle.addImage(Obstacle6);
  break;

  default:break;

}
Obstacle.scale=0.6;
Obstacle.lifetime=220
obstaclesGroup.add(Obstacle);
}
 }
function spawnClouds(){
  if(frameCount %60===0){
    cloud=createSprite(650,100,50,10)
    cloud.velocityX= -5 
    cloud.addImage(cloudimage)
    cloud.scale=0.9
    cloud.y=Math.round(random(10,60))

    cloud.lifetime=220;

    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloudsGroup.add(cloud);
  }


}
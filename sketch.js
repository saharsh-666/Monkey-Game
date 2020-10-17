//gameStates
var PLAY = 1
var END = 0
var gameState = PLAY;

//making the variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground

var survivalTime = 0
var score = 0



function preload(){
  
  //loading animation for monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loading animation for banana
  bananaImage = loadImage("banana.png");
  
  //loading animation for obstacles
  obstacleImage =
    loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,300)
  
  //creating all the sprites
  monkey = createSprite(100,250,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1; 

  //creating the ground
  ground = createSprite(100,280,2000,20);
  ground.x = ground.width/2
  
  //creating the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();


}


function draw() {
  
background("lightblue")
  
  if(gameState === PLAY){
  
  ground.velocityX = -2
  
  if(ground.x === 0){
   ground.x = ground.width/2
     
}
  if(keyDown("space") && monkey.y >=239){
   monkey.velocityY  = -14
    
  } 
    console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(ground)
  
 if(monkey.isTouching(foodGroup)){
    score = score+1
    foodGroup.destroyEach()
 }
  
  spawnBananas();
  
  spawnObstacles()
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  } else if(gameState === END){
    
    ground.velocityX = 0;
    score = 0;
    survivalTime = 0;
    
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
      monkey.collide(ground)
    
    text("Game Over,Press 'R' to restart ",100,100)
    if(keyDown("R")){
      reset()
      
    }
  }
  
  
  
  
  drawSprites()
  text("Survival time: "+ survivalTime, 500,50);
     survivalTime = survivalTime + Math.round(frameCount/60);
  
   
    text("score:"+score,400,50)
    
  
}
 function spawnObstacles(){
   if(frameCount % 100 === 0){
     obstacle = createSprite(400,250,20,30)
     obstacle.addImage(obstacleImage)
     obstacle.velocityX = -6
     obstacle.scale = 0.1
     obstacle.lifetime = 120;
     
     obstacleGroup.add(obstacle)
   }
 
 }
 function spawnBananas(){
   if (frameCount % 120 === 0) {
     banana = createSprite(600,100,40,10)
     banana.y = Math.round(random(60,100));
     banana.addImage(bananaImage)
     banana.scale = 0.1
     banana.velocityX = -6;
     banana.lifetime = 170
     
     foodGroup.add(banana);
   }
 }
 function reset(){
   
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   gameState = PLAY;
   
 }





























































































































































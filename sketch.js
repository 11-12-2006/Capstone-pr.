// write your story here //
//*A lot of time ago there was a thief who came to the city after stealing from his village, some time passed but he did not get any less in the city, he thought of stealing it and started stealing it in the city too and now he Has become a very prominent thief of the city, which even the police have not been able to confirm till nowA lot of time ago there was a thief who came to the city after stealing from his village, some time passed but he did not get any less in the city, he thought of stealing it and started stealing it in the city too and now he Has become a very prominent thief of the city, which even the police have not been able to confirm till now.//

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var thief, thief_running, ;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImage, background1;
var score=0;
var jumpSound, Game_overSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("jump.wav")
  Game_overSound = loadSound("Game_over.wav")
  
  backgroundImage = loadImage("city background.jpg")
  
  
  thief_running = loadAnimation("thief 1.png","thief 2.png","thief 3.png","thief 4.png","thief 5.png","thief 6.png");
  
  
  
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("start_restart_button.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  
  thief = createSprite(50,height-70,20,50);
  
  
  thief.addAnimation("running", trex_running);
  thief.setCollider('circle',0,0,350)
  thief.scale = 0.08
  // thief.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  background1 = createSprite(width/2,height,width,2);
  background1.addImage("city background",backgroundImage);
  background1.x = width/2
  background1.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  

  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //thief.debug = true;
  background(backgroundImage);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    background1.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && thief.y  >= height-120) {
      jumpSound.play()
      thief.velocityY = -15;
       touches = [];
    }
    
    thief.velocityY = thief.velocityY + 0.8
  
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
  
    
   
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(thief)){
        Game_overSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    background1.velocityX = 0;
    thief.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width+10,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = thief.depth;
    thief.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  thief.changeAnimation("running",thief_running);
  
  score = 0;
  
}

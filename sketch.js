var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var simba, simbaImg, simbaJump, simbaStand, jumpSound;
var ground, groundImg, invisible;
var obstacle, obstaclesGroup;
var score=0;
var coin, coinGroup, coinImg, coinSound;
var gameover, restart, restartImg;

function preload() {
  
  simbaImg = loadAnimation("lion1.png","lion2.png","lion3.png","lion4.png","lion5.png","lion1.png","lion2.png");  
  
  groundImg = loadImage("Backy4.jpg");
  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("bush.png");
  obstacle3 = loadImage("barrier.png");
  coinImg = loadImage("coin.png");
  
  restartImg = loadImage("restart.png");
  
 }

function setup(){
  createCanvas(displayWidth-700, displayHeight-150);
  
  ground = createSprite(displayWidth, displayHeight-520, 10,10);
  ground.addImage(groundImg);
 // ground.scale = 0.7;
  ground.x = ground.width/2;               
  ground.velocityX = -5; 
  
  simba = createSprite(displayWidth-1470,displayHeight-200,10,10);
  simba.addAnimation("simba",simbaImg);
  simba.scale = 0.35;
  
  invisible = createSprite(displayWidth-1050,displayHeight-200,displayWidth,10);  
  invisible.visible = false;
  
  restart = createSprite(displayWidth/2-350,displayHeight/2,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;
  
  
  obstaclesGroup = new Group(); 
  coinGroup = new Group();
  
  score = 0;
}

function draw(){
  //background("pink");
  
  text("Score: "+ score, 300,50);
  
  console.log(restart.x);
    
  if (gamestate === PLAY){
   
    simba.visible = true;
  
    ground.visible = true;
        
    if (ground.x < 0){
        ground.x = ground.width/2;
      }    
    
    fill("white");    
    text("Score: "+ score, 300,50);
        
    simba.velocityY = simba.velocityY + 0.9;
    //console.log(simba.y);
    
    if (keyDown("space") && simba.y >=  200) {
        //jumpSound.play();
        simba.velocityY = -6;
      }

    if (coinGroup.isTouching(simba)){ 
      
       coinGroup.destroyEach();
       score = score+10;
    }

    
    simba.collide(invisible);
    spawnObstacle();
    spawnCoins();
    
    if (obstaclesGroup.isTouching(simba)){
      gamestate = END;
    }    
  }
  
  if (gamestate === END){
    coinGroup.destroyEach();
    obstaclesGroup.destroyEach();
    simba.collide(invisible);
    simba.visible = false;
    ground.visible = false;
    restart.visible = true;
    background("black");
    textSize(60);
    fill("white");
    stroke("white");
    text("GAMEOVER",displayWidth/2-500,displayHeight/2-100);
  }
   
  if(mousePressedOver(restart)) {
     reset();
  }
  drawSprites();
}

function spawnObstacle(){
  if(frameCount % 90 === 0) {
    var index = 0;
    var obstacle = createSprite(510,465,10,40);
    obstacle.setCollider("circle",0,0,40);
    //obstacle.debug = true;
    
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstacle.velocityX = -6 ;
    for(var obstacles in allObstacles){
      index = index+1;
      x = x+200;
      y = displayHeight-allObstacles[obstacles].distance;
      obstacle[index-1].x = x;
      obstacle[index-1].y = y;

    if(index === obstacle.index){
      //obstacle[index-1].shapeColor= red;
      camera.posision.x = displayWidth/2;
      camera.posision.y = obstacle[index-y].y;
    }

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnCoins(){
  if (frameCount % 160 === 0) {
     var coin = createSprite(600,330,10,10);
      coin.y = Math.round(random(200,300));
      coin.addImage(coinImg);
      coin.scale = 0.1;
      coin.velocityX = -3;
      coin.lifetime=200;
      coinGroup.add(coin);

      for(var coins in allCoins){
        index = index+1;
        x = x+200;
        y = displayHeight-allCoins[coins].distance;
        coin[index-1].x = x;
        coin[index-1].y = y;
  
      if(index === coin.index){
        //obstacle[index-1].shapeColor= red;
        camera.posision.x = displayWidth/2;
        camera.posision.y = coin[index-y].y;
      }
    
    //console.log(coin.y);

    }
}

function reset(){
  gamestate = PLAY;
  restart.visible = false;
   
}
}
}
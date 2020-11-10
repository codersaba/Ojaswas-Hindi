var play = 1;
var end = 0;
var stop;
var gamestate = play;
var player, ground, bg, invisibleGround, restart, ObstaclesGroup, FoodGroup;
var restartImg, bgImg, playerImg,jump,coin;
var facts = 0;
var count = 0;
var fact,close;

function preload(){
  restartImg = loadImage("assets/restart.png");
  bgImg = loadImage("assets/bg3.png");
  hunterImg = loadAnimation("assets/hunter1.png","assets/hunter2.png","assets/hunter3.png");
  playerImg = loadAnimation("assets/jaguar1.png","assets/jaguar2.png","assets/jaguar3.png","assets/jaguar2.png")
  jump = loadAnimation("assets/jaguar1.png");
  dead = loadAnimation("assets/jaguar4.png");
  snakeImg = loadAnimation("assets/snake1.png", "assets/snake2.png")
  coin = loadAnimation("assets/c1.png","assets/c2.png","assets/c3.png","assets/c4.png","assets/c5.png","assets/c6.png")
  fact1 = loadImage("assets/fact1.png");
  fact2 = loadImage("assets/fact2.png");
  fact3 = loadImage("assets/fact3.png");
  fact4 = loadImage("assets/fact4.png");
  fact5 = loadImage("assets/fact5.png");
  fact6 = loadImage("assets/fact6.png");
  fact7 = loadImage("assets/fact7.png");
  fact8 = loadImage("assets/fact8.png");
  fact9 = loadImage("assets/fact9.png");
  fact10 = loadImage("assets/fact10.png");
  fact11 = loadImage("assets/fact11.png");
  fact12 = loadImage("assets/fact12.png");
  fact13 = loadImage("assets/fact13.png");
  fact14 = loadImage("assets/fact14.png");
  fact15 = loadImage("assets/fact15.png");
  closeButton = loadImage("assets/close.png");
  lion = loadAnimation("assets/lion1.png","assets/lion2.png","assets/lion3.png","assets/lion4.png","assets/lion5.png")
}

function setup(){

  createCanvas(800,800);

  bg = createSprite(550,500,800,800);
  bg.addAnimation("img",bgImg);
  bg.scale = 3.5;
  //bg.x = bg.width /3.5;

  player = createSprite(300,780,100,100);
  player.setCollider("circle",50,0,50);
  player.debug = true;
  player.scale = 0.75;
  player.x = 100;
  player.addAnimation("playerImg", playerImg)

  ground = createSprite(2000,780,1750,20);
  ground.x = ground.width /2;
  ground.visible = false;

  restart = createSprite(400,400);
  restart.addAnimation("restartImg", restartImg);
  restart.scale = 2;
  restart.visible = false;

  ObstaclesGroup = createGroup();
  FoodGroup = createGroup();
  FactsGroup = createGroup();
}

function draw(){
  background(rgb(117, 60, 122));

  textSize(32);
  textFont("Georgia");
  textStyle(BOLD);
  text("Your Score:" + count,520,70);
  text("Facts Done: " + facts, 30,70);

  //player.position(50, 350);
  //console.log(gamestate);
 
  if(gamestate === play){
   
    bg.velocityX = -(6 + 3*count/100);
    count = count + Math.round(World.frameRate/60);
   
    if (bg.x < -250){
      bg.x = 500;
    }
    if(keyDown("space") && player.y >= 359){
      player.velocityY = -12 ;
      player.changeImage("j", jump);
      //playSound("jump.mp3");
    }
    player.velocityY = player.velocityY + 0.8;

    spawnFood();
    spawnObstacles();

    if(ObstaclesGroup.isTouching(player)){
    //  playSound("jump.mp3");
      gamestate = end;
    //  playSound("die.mp3");
    }
    if(FoodGroup.isTouching(player)){
      count += 1;
      gamestate = stop;
      console.log("game paused");
      player.changeAnimation("jump", jump)
    }
  }  if(gamestate === stop){
    bg.velocityX = 0;
    player.velocityY = 0;
    player.y = 780;
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.destroyEach(0);
    displayFacts();
    gameState=play;
  }
  else if(gamestate === end){
      restart.visible = true;
      bg.velocityX = 0;
      player.velocityY = 0;
      ObstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      player.changeAnimation("killed", dead)

      if(player.isTouching(ObstaclesGroup)){
        text("The Jaguar Died",50,260);

      }

      ObstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
    if(mousePressedOver(restart)) {
      reset();
    }
    player.collide(ground);

  drawSprites();
}

function reset(){
  gamestate = play;
 
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  FoodGroup.destroyEach(); 
  count = 0;
}

function spawnObstacles() {
  if(World.frameCount % 260 === 0) {
    var obstacle = createSprite(800,665,60,90);
    obstacle.velocityX = - (random(6,10) + 3*count/100); 
    //obstacle.addAnimation("o1",snakeImg)      
    obstacle.scale = 0.5;
    obstacle.lifetime = 170;
    ObstaclesGroup.add(obstacle);
    obstacle.collide(ground);
    obstacle.setCollider("circle",0,0,50)

    var rand = Math.round(random(1,3));
    switch(rand) {
         case 1: obstacle.addAnimation("h",hunterImg);
         obstacle.scale = 1.4;
         obstacle.setCollider("circle",0,20,50)
         break;
         case 2: obstacle.addAnimation("s", snakeImg);
         obstacle.setCollider("circle",-170,-30,50)
         obstacle.scale = 0.50; 
         obstacle.y = 700;
         case 3: obstacle.addAnimation("l", lion);
         obstacle.setCollider("circle",-180,-30,50)
         obstacle.debug = true;
         obstacle.scale = 0.50; 
         obstacle.y = 700;
      default: break;
    }
  }
}

function spawnFood() {
  if (World.frameCount % 80 === 0) {
    var food = createSprite(800,220,70,50);
    food.y = random(380,620);
    food.addAnimation("c",coin)
    food.scale = 0.5;
    food.velocityX = -3;
    food.lifetime = 334;
    food.depth = player.depth;
    player.depth = player.depth + 1;
    FoodGroup.add(food);
  }
}


function displayFacts(){
  if(gamestate === stop ){
    fact = createSprite(400,400,500,350);
    fact.scale = 0.4;
   
    close = createSprite(750,220, 70,70);
    close.addAnimation("c", closeButton);
    close.scale = 0.09
    var rand = Math.round(random(1,5));
    switch(rand) {
         case 1: fact.addImage(fact1);
         break;
         case 2: fact.addImage(fact2);
         break;
         case 3: fact.addImage(fact3);
         break;
         case 4: fact.addImage(fact4);
         break;
         case 5: fact.addImage(fact5);
         break;
         case 6: fact.addImage(fact6);
         break;
         case 7: fact.addImage(fact7);
         break;
         case 8: fact.addImage(fact8);
         break;
         case 9: fact.addImage(fact9);
         break;
         case 10: fact.addImage(fact10);
         break;
         case 11: fact.addImage(fact11);
         break;
         case 12: fact.addImage(fact12);
         break;
         case 13: fact.addImage(fact13);
         break;
         case 14: fact.addImage(fact14);
         break;
         case 15: fact.addImage(fact15);
         break;
      default: break;
    }
    gameState=play
    FactsGroup.add(fact);
    FactsGroup.setLifetimeEach(1000)
    
  if(mousePressedOver(close)){
    gamestate = play;
    close.remove();
    FactsGroup.destroyEach();
  }
  }
}
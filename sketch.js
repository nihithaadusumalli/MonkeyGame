var bananaImage,obstacleImage,backImage,foodImage,overImage,restartImage;
var monkeyAnimation;
var obstacleGroup, foodGroup;
var score;
var ground,food,obstacle;
var c;
var PLAY,END,gameState;
var jump,check,die;

function preload()
{
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  foodImage = loadImage("banana.png");
  backImage = loadImage("jungle.jpg");
  overImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
 monkeyAnimation1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 monkeyAnimation2 = loadAnimation("Monkey_01.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  check = loadSound("checkPoint.mp3");
}

function setup() 
{
  createCanvas(400, 400);
  
  scene = createSprite(200,200,400,400);
  scene.addImage(backImage);
  scene.x = scene.width/2;
  scene.velocityX = -6;
  
  monkey = createSprite(40,360,10,10);
  monkey.addAnimation("monkey_running",monkeyAnimation1);
  monkey.addAnimation("monkey_dead",monkeyAnimation2);
  monkey.scale = 0.10;
  
  ground = createSprite(200,370,400,5);
  ground.visible = false;
  
  gameover = createSprite(200,140,10,10);
  gameover.addImage(overImage);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  restart = createSprite(200,200,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.8 ;
  restart.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  c = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() 
{
  background(220);
  monkey.collide(ground);
  
  if(scene.x<0)
  {
    scene.x = scene.width/2;
  }
  
  if(gameState == PLAY)
  {
    if(keyDown("space"))
  {
    monkey.velocityY = -12;
  }
    
  //console.log(player.y);
  if(frameCount % 80 == 0)
  {
    spawnFood();
  }
  if(frameCount % 300 == 0)
  {
    spawnObstacles();
  }
  
  if(foodGroup.isTouching(monkey))
  {
    score = score + 2;
    jump.play();
    foodGroup.destroyEach();
    if(score>0 && score%10==0)
    {
      check.play();
    }
    switch(score)
    {
        case 10: monkey.scale = 0.12;
        break;
        case 20: monkey.scale = 0.14;
        break;
        case 30: monkey.scale = 0.16;
        break;
        case 40: monkey.scale = 0.18;
        break;
        default: break;
    }
  }
  if(obstacleGroup.isTouching(monkey))
  {
    monkey.scale = 0.10;
    obstacleGroup.destroyEach();
    c = c+1;

    score = score - 2;
    die.play();
  }
    if(c==2 && gameState == PLAY)
    {
      gameState = END;
      score = score + 2;
    }
  }
  if(gameState == END)
  {
    monkey.changeAnimation("monkey_dead",monkeyAnimation2);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    scene.velocityX = 0;
    restart.visible = true;
    gameover.visible = true;
  }
  if(mousePressedOver(restart) && gameState == END)
  {
    gameState = PLAY;
    reset();
  }
  monkey.velocityY = monkey.velocityY + 0.4;
  drawSprites();
  stroke("green");
  textSize(16);
  fill("red");
  text("SCORE :" + score,20,50);
}

function spawnFood()
{
  var food = createSprite(400,160,10,10);
  food.addImage(foodImage);
  food.y = random(120,200);
  food.velocityX = -(6 + Math.round(score/10));
  food.lifetime = 70;
  foodGroup.add(food);
  food.scale = 0.05;
}

function spawnObstacles()
{
  obstacle = createSprite(400,350,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + Math.round(score/10));
  obstacle.lifetime = 70;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
}

function reset()
{
  monkey.changeAnimation("monkey_running",monkeyAnimation1);
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  scene.velocityX = -6;
  score = 0;
  c = 0;
  restart.visible = false;
  gameover.visible = false;
}





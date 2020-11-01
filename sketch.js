//CREATE VARIABLES
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground, groundImg, invGrnd;
var survivalTime = 0;

//PRELOAD FUNCTION
function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg = loadImage("imgonline-com-ua-resize-qYt1pc1r23p.jpg");
}

//SETUP FNC
function setup() {
  //WORK AREA
  createCanvas(400, 400);

  //MONKEY SPRITE
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //GROUND SPRITE
  ground = createSprite(200, 350, 900, 10);
  ground.addImage(groundImg);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.scale = 1;
  //console.log(ground.x);

  //INVISIBLE GROUND
  invGrnd = createSprite(0, 340, 400, 10);
  invGrnd.visible = false;

  //ADJUSTS DEPTH
  monkey.depth = ground.depth;
  monkey.depth = monkey.depth + 1;

  //GROUPS
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //BACKGROUND COLOUR
  background("lightyellow");

  //TEXT STYLES
  stroke("black");
  textSize(20);
  fill("black");

  //SCORING SYSTEM
  survivalTime = Math.ceil(frameCount / frameRate());
  text("SURVIVAL TIME= " + survivalTime, 100, 50);

  //FUNCTIONS CALLED
  food();
  obstacles();

  //JUMP
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -16;
  }

  //GRAVITY
  monkey.velocityY = monkey.velocityY + 0.8;

  //INFINITE GROUND ILLUSION
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  //MONKEY'S COLLISION WITH INFINITE GROUND
  monkey.collide(invGrnd);

  //SPRITE DISPLAY
  drawSprites();
}

// FOOD FNC.
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(120, 200)), 10, 10);
    banana.velocityX = -5;
    banana.lifetime = 80;
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    foodGroup.add(banana);
  }
}

//OBSTACLE FNC
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(Math.round(random(80, 400)), Math.round(random(90, 340)), 10, 10);
    obstacle.velocityX = -5;
    obstacle.lifetime = 90;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    console.log(obstacle.y);

    if (survivalTime >= 20 && obstacle.y < 190) {
      obstacle.velocityY = 5;
    }
  }
}
var bananaImage, stoneImage, monkeyImage, jungleImage,monkey1;
var banana, monkey, jungle, stone, invisibleGround, bananaGroup, stoneGroup,monkeyc;
var gameState = "play";
var score = 0;

function preload() {
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(displayWidth-100, 400);
  //jungle = createSprite(200, 200, 20, 20);
  //jungle.addImage("jungle", jungleImage);
  invisibleGround = createSprite(300, 370, 4000, 10);
  invisibleGround.visible=false;
  monkey = createSprite(70, 330, 20, 20);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.18;
  bananaGroup = new Group();
  //jungle.x = jungle.width / 2;
  stoneGroup = new Group(); 
  monkey.velocityX=10;
 
}

function draw() {

  //set background as plain
  background(255)

  //set jungle as background
  image(jungleImage,-1000,0,3500,400);
  


  //make ground endless
  if(monkey.x>1700){
    monkey.x=100;
  }
  //draw sprites
  drawSprites();
  //jump the monkey up to catch banana
  if(keyDown("Enter")&& monkey.y>205){
    monkey.velocityY=-12;
  }

  //add gravity
  monkey.velocityY=monkey.velocityY+0.8;
  //monkey shouldn't fall down
  monkey.collide(invisibleGround);

  //score should increase when monkey collects banana
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }

  //call the functions
  stonee();
  bananan();

//restart the game after pressing enter
if (gameState == "end") {
  banana.velocityX=0; 
  banana.destroy();
  stone.velocityX=0; 
  stone.destroy();
  textSize(23);
  stroke("purple");
  fill("purple");
  text("Press enter to restart the game...",120,200);
  score=0;
}
if(keyDown("enter")){
gameState="play";
  text.visible=false;
}

//should stop when it collide with stone
if (monkey.isTouching(stoneGroup)) {
  gameState = "end"; 
  monkey.visible=false;
}

  //show the scores 
  textSize(20);
  textFont("Corbel");
  stroke("red");
  fill("blue");
  text("SCORE: " + score, 30, 30);

    //move the monkey [not the ground]
    camera.x=monkey.x;
}

function stonee() {

  if (World.frameCount % 300 == 0) {
    stone = createSprite(600, 330, 20, 20);
    stone.addImage("stone", stoneImage);
    stone.scale = 0.155;
    stone.velocityX = -3;
    stone.lifetime = 595 / 2;
    stoneGroup.add(stone);
    if(gameState=="end"){
    stoneGroup.destroyEach();
    stoneGroup.setVelocityEach(0);
    }
  
    if (monkey.isTouching(stoneGroup)) {
        stoneGroup.destroyEach();

    }
    stone.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function bananan() {
  if (World.frameCount % 200 == 0) {
    banana = createSprite(580, 200, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.04;
    banana.velocityX = -3;
    banana.lifetime = 580 / 2;
    bananaGroup.add(banana);
    if(gameState=="end"){
    bananaGroup.destroyEach();
      bananaGroup.setVelocityEach(0);
    }
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}
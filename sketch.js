//Game States
var END = 0;
var gameStates = 1;

var score;
var Boy_Running;
var Boy;
var Run_Running;
var Run;
var Coin;
var CoinImage;
var coinsGroup;
var bird;
var BirdsGroup;
var Bird_Flying;
var InvisibleGround;
var bg, bg_Img;

function preload(){
    Run_Running = loadAnimation("Run1.png","Run2.png","Run3.png","Run4.png","Run5.png","Run6.png",
    "Run7.png","Run8.png");

    Bird_Flying = loadAnimation("Bird1.png","Bird2.png","Bird3.png","Bird4.png",
    "Bird5.png","Bird6.png","Bird7.png","Bird8.png","Bird9.png")

    CoinImage = loadImage("Coin.png");

    bg_Img = loadImage("Background.jpg");
}

function setup(){

    score = 0;

    createCanvas(displayWidth, displayHeight);
    bg = createSprite(displayWidth/2, displayHeight/2);
    bg.scale = 3;
    bg.addImage("Background",bg_Img);

    Run = createSprite(300,450,10,10);
    Run.addAnimation("BoyRunning",Run_Running);
    Run.scale = 0.9;

    InvisibleGround = createSprite(660,600,displayWidth,10);
    InvisibleGround.visible = false;

    coinsGroup = new Group();

    BirdsGroup = new Group();
}

function draw(){
    bg.velocityX = -2;
    if(bg.x<displayWidth/2.5){
        bg.x = bg.width/2;
    }

    if(keyDown("space")){
        Run.velocityY = -20;
    }
    Run.velocityY = Run.velocityY+0.8;

    Run.collide(InvisibleGround);

    if(Run.isTouching(BirdsGroup)){
        gameStates=END;

    spawnCoins();
    spawnBirds();

    if(Run.isTouching(coinsGroup)){
        coinsGroup.destroyEach();
        score = score+2;
    }

    drawSprites();

    textSize(20);
    fill("black");
    text("Score : "+score, 600, 50);
}

function spawnCoins(){
    if(frameCount % 500 === 0){
        var coin = createSprite(displayWidth,displayHeight,10,10);
        coin.y = Math.round(random(50,150));
        coin.addImage(CoinImage);
        coin.scale = 0.3;
        coin.velocityX = -3;

        coin.lifetime = 1000;

        coinsGroup.add(coin);
    }
} 

function spawnBirds(){
    if(frameCount % 120 === 0){
        bird = createSprite(displayWidth,displayHeight,5,5);
        bird.y = Math.round(random(50,250));
        bird.addAnimation("Bird", Bird_Flying);
        bird.scale = 0.5;
        bird.velocityX = -3;

        bird.lifetime = 500;

        BirdsGroup.add(bird);
    }
       }  
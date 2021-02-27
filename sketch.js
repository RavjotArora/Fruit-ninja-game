//Game States
var PLAY=1;
var END=0;
var gameState=1;


var fruit, fruitImg, fruit2Img, fruit3Img;
var monster, alien1Img, alien2Img;
var Gameover, gameOverImg;


var GameOversound, Swooshsound;

var knife;
var knifeImage ;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruitImg = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  alien1Img = loadAnimation("alien1.png","alien2.png");
  
  
  gameOverImg = loadImage("gameover.png");
  
  GameOverSound = loadSound("gameover.mp3");
  SwooshSound = loadSound("knifeSwoosh.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
  
   Gameover=createSprite(300,300);
   Gameover.addAnimation("GameOver",gameOverImg);
   Gameover.scale=2;
   Gameover.visible=false;
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
 
  //create fruit and monster Group variable here
  fruitrandomGroup=new Group();
  alienGroup=new Group();

}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruit();
    monster();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if(fruitrandomGroup.isTouching(knife)){
      score=score+2;
      SwooshSound.play();
      fruitrandomGroup.destroyEach();
  }
   
    // Go to end state if knife touching enemy
    if(alienGroup.isTouching(knife)){
      gameState=END;
      GameOverSound.play();
      Gameover.visible=true;
    }
  }
  
   else if (gameState === END) {
     
    fruitrandomGroup.destroyEach();
    fruitrandomGroup.setVelocityYEach(0);
     
    alienGroup.destroyEach();
    alienGroup.setVelocityYEach(0);
     
    knife.visible=false;
     
   }
  
  function fruit(){
    if (World.frameCount % 80 == 0) {
     var fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      fruitrandomGroup.add(fruit);
      r =Math.round(random(1,3));
    if(r==1){
        fruit.addImage(fruitImg);
      } 
    
    if(r==2){
        fruit.addImage(fruit2Img);
    }
      
    if(r==3){
        fruit.addImage(fruit3Img);
    }
      
     
      
      fruit.y=Math.round(random(50,340));
      
      fruit.velocityX=-(8+(score/10));
      fruit.setlifetime=100;
      
     
      
       position = Math.round(random(1,2));
      
      if(position==1){
        fruit.x=600;
       }
      
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(8+(score/10));
       }
    
    }
  }
  
  function monster(){
    if (World.frameCount % 200 == 0) {
       var monster = createSprite(400,200,20,20);
      monster.scale = 1;
      monster.addAnimation("moving",alien1Img);
      //monster.addAnimation("attack",alien2Img); 
      
       monster.y=Math.round(random(50,340));
      
    monster.velocityX=-(8+(score/10));
    monster.setlifetime=100;
    
    if (World.frameCount % 10 == 0) { 
      monster.addAnimation("moving",alien1Img);   
    }
      
    if (World.frameCount % 15 == 0) { 
      monster.changeAnimation("attack",alien2Img);   
    }  
      
      if(position==1){
        monster.x=600;
       }
      
      if(position==2){
        monster.x=0;
        monster.velocityX=(8+(score/10));
       }
      
    alienGroup.add(monster);
    
        
      } 
    
   
      }
  
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

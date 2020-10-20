var PLAY = 1;
var END = 0;
var gameState = PLAY;

var position;

var alien, alienImage;
var fruitsGroup, fruits, fruit1, fruit2, fruit3, fruit4;

var sword, swordImage, swordSlicingSound;
var gameover, gameoverImage, gameoverSound;

  function preload(){
    swordImage = loadImage("sword.png");
    swordSlicingSound = loadSound("knifeSwooshSound.mp3");

    alienImage = loadAnimation("alien2.png", "alien1.png");

    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");

    gameoverImage = loadImage("gameover.png");
    gameoverSound = loadSound("gameover.mp3");
  }

  function setup() {
    createCanvas(600, 400);
    sword = createSprite(300,180,20,50);
    sword.addImage("sword", swordImage);
    sword.scale = 0.5;
    //sword.debug=true

    //create fruit and cloud Groups
    fruitsGroup = createGroup();
    aliensGroup = createGroup();

    console.log("Hello" + 5);

    gameover = createSprite(300, 200);
    gameover.addImage("gameover", gameoverImage);
    gameover.scale=1.5;

    score = 0

  }

  function draw() {
    background("skyblue");
    //displaying score
    text("Score: "+ score, 30,30);
    console.log("this is ",gameState)
    
    if(gameState === PLAY){
      gameover.visible=false;
      fruit();
      aliens();
      sword.y = World.mouseY;
      sword.x = World.mouseX;
      if(fruitsGroup.isTouching(sword)){
        fruitsGroup.destroyEach();
        swordSlicingSound.play();
        score=score+2;
      }
      if(aliensGroup.isTouching(sword)){
        fruitsGroup.destroyEach();
        aliensGroup.destroyEach();
        swordSlicingSound.play();
        gameoverSound.play();
        gameState = END;
      }
    }
    else if (gameState === END) {
      gameover.visible=true;
      fruitsGroup.setVelocityXEach(0);
      aliensGroup.setVelocityXEach(0); 
    }
    drawSprites();
  }
  function aliens(){
    if(World.frameCount%200===0){
    alien = createSprite (600, 200, 20, 20);
    alien.addAnimation("alien", alienImage);
    alien.y = Math.round(random(40,360))
    alien.scale=0.8;
    alien.velocityX=-(5+(score/10));
    alien.lifetime = 90;
    aliensGroup.add(alien);
    }
  }
  
  function fruit(){
    if (World.frameCount%40===0){ 
      position = Math.round(random(1,2));
      fruits = createSprite(600, 200, 40, 40);
      fruits.y = Math.round(random(40,360));
      console.log(position)
      if (position===1){
        fruits.x=0;
        fruits.velocityX=(4+(score/4));
      }
      else if(position===2){
          fruits.X=600;
          fruits.velocityX=-(4+(score/4));   
      }
    
    var select_fruit = Math.round(random(1,4));
    console.log(select_fruit)
      if (select_fruit===1){ 
        fruits.addImage("1", fruit1);
      } else if (select_fruit===2){
        fruits.addImage("2", fruit2);
      } else if (select_fruit===3){
        fruits.addImage("3", fruit3);
      } else if (select_fruit===4){
        fruits.addImage("4", fruit4);
      } 
      fruits.scale=0.2;
      fruits.lifetime = 133;
      fruitsGroup.add(fruits);
      }    
    } 
var dog,happyDog,database,foodS,foodStock,feed,food
var addFood
var fedTime,lastFed
var foodObj,dogImg
function preload()
{
  dogImg=loadImage("images/Dog.png")
  happyDog=loadImage("images/happydog.png")

}

function setup() {
  createCanvas(1000,500);

  dog=createSprite(800,200,150,250)
  dog.addImage(dogImg)
  dog.scale=0.15

  foodObj=new Food()

  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  
  food=30;

  feed=createButton("Feed Drago")
  feed.position(700,105)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,105)
  addFood.mousePressed(addFoods)

}



function draw() {  
background(46,139,87)

fedTime=database.ref("FeedTime")
fedTime.on("value",function (data){
  lastFed=data.val();
})

fill(225)
textSize(20)
if(lastFed>=12){
text("Last Feed :"+lastFed % 12 + "PM" , 700,105)
}else if(lastFed==0){
  text("last fed : 12 AM",350,60)
}else {
  text("last fed :"+lastFed + "AM",350,60)
}
text("Food Remaining : "+foodS,600,60)

  foodObj.display();
  drawSprites();
  

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock()
    
  })
}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}

let images = []
let startingIndex = 0
let textList = ['What', 'is', 'this?']
let messageIndex = 0;


function preload(){
  images[0] = loadImage("bleeding.webp")
  images[1] = loadImage("bloody.webp")
  images[2] = loadImage("bomb.webp")
  images[3] = loadImage("fire.avif")
  images[4] = loadImage("lynch.jpg")
  images[5] = loadImage("teeth.jpeg")
  font = loadFont('Lora-Bold.ttf')
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)
}

function draw() {
  
  image(images[startingIndex], windowWidth/2, windowHeight/2)

  if (startingIndex % 3 === 2) {
    textAlign(CENTER)
    textSize(100)
    fill('white')
    textFont(font)
    text(textList[messageIndex], width/2, height/2)
  }


  if (frameCount % 8 == 0){
      console.log(startingIndex)
      startingIndex = (startingIndex + 1) % images.length
  }

  if ((startingIndex % 3 )== 0) {
    messageIndex ++
    messageIndex = messageIndex % 3
  }
  

}


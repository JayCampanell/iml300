let images = []
let startingIndex = 0
let textList = ['What', 'is', 'this?']
let messageIndex = 0;


function preload(){
  images[0] = loadImage("./assets/p5js/assets/bleeding.webp")
  images[1] = loadImage("./assets/p5js/assets/bloody.webp")
  images[2] = loadImage("./assets/p5js/assets/bomb.webp")
  images[3] = loadImage("./assets/p5js/assets/fire.avif")
  images[4] = loadImage("./assets/p5js/assets/lynch.jpg")
  images[5] = loadImage("./assets/p5js/assets/teeth.jpeg")
  images[6] = loadImage("./assets/p5js/assets/reddit.webp")
  font = loadFont('./assets/p5js/assets/Lora-Bold.ttf')
  sound = loadSound('./assets/mouseClick.mp3')
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  console.log("starting image to print:", startingIndex)
  image(images[startingIndex], windowWidth/2, windowHeight/2)

  if (startingIndex % 3 === 2) {
    textAlign(CENTER)
    textSize(100)
    fill('white')
    textFont(font)
    text(textList[messageIndex], width/2, height/2)
  }


  if (frameCount % 5 == 0){
      console.log(startingIndex)
      startingIndex = (startingIndex + 1) % images.length
      sound.play()
  }

  if ((startingIndex % 6 )== 0) {
    messageIndex ++
    messageIndex = messageIndex % 3
  }

  

}


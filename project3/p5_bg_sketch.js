let rotX = 0;
let rotY = 0;
let idleTimer = 0; 
let myCam;
// ORIGINAL TAKEN FROM ORBIT CONTROL EXAMPLE: https://p5js.org/examples/3d-orbit-control/

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  strokeWeight(1);
  noFill();
  stroke('orange');
  camera(0, 0, 1500, 0, 0, 0, 0, 1, 0); 
}

function draw() {
  background('white')
  
  // HELP GENERTED WITH AI
  // 1. Check if the mouse is moving AND is inside the canvas boundaries
  let isMouseMoving = (mouseX !== pmouseX || mouseY !== pmouseY) && 
                      (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height);

  if (isMouseMoving) {
    rotY += (mouseX - pmouseX) * 0.5; 
    rotX += (mouseY - pmouseY) * 0.5; 
    
    idleTimer = 0; 
  } else {
    idleTimer++; // Count up while the mouse is still
    
    // wait for .5 sec before autorotating
    if (idleTimer > 10) {
      rotY += 0.9; 
      rotX += 0.2;
    }
  }

  // 3. Apply the calculated rotations
  rotateX(rotX);
  rotateY(rotY);

  // Rotate rings in a half circle to create a sphere of cubes
  for (let zAngle = 0; zAngle < 180; zAngle += 30) {
    // Rotate cubes in a full circle to create a ring of cubes
    for (let xAngle = 0; xAngle < 360; xAngle += 30) {
      push();

      // Rotate from center of sphere
      rotateZ(zAngle);
      rotateX(xAngle);

      // Then translate down 400 units
      translate(0, 400, 0);
      box(300, 300, 300);
      pop();
    }
  }
}

function windowResized() {
  // This resizes the 3D space if the user resizes their browser window
  resizeCanvas(windowWidth, windowHeight);
}
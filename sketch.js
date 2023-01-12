
let first;
let second;
let third;
let font1;
let font2;

function setup() {
//   createCanvas(windowWidth-40, 700+(windowWidth-1700)*0.3);
createCanvas(windowWidth, windowWidth*0.55).parent('p52');

  first = createVector(0, 0);
  second= createVector(0, 0);
  third= createVector(0, 0);

  font1 = loadFont('assets/EduDiatypeSemi-Mono-Regular.otf');
  font2 = loadFont('assets/AvenirNextLTPro-Demi.otf');
}

function draw() {

  background(220);
  
  let target=new createVector(mouseX, mouseY);
  //block
  let speed1= p5.Vector.sub(target, first);
  speed1.mult(0.1);
  first.add(speed1);
  //v
  let speed2= p5.Vector.sub(target, second);
  speed2.mult(0.05);
  second.add(speed2);
  //b
  let speed3= p5.Vector.sub(target, third);
  speed3.mult(0.03);
  third.add(speed3);
  fill(255);
  push();
  blendMode(DIFFERENCE);
  push();
  textFont(font1);
  textAlign(CENTER, CENTER);
  textSize(200);
  text ("V", second.x, second.y);
  pop();

push();
translate(2,-30);
  textSize(50);
  textFont(font2);
  textAlign(CENTER, CENTER);
  text ("B", third.x, third.y);
  
  pop();
  
  push();
translate(-59,33);
  rect(first.x, first.y, 118,66);
  
  pop();
  pop();

}





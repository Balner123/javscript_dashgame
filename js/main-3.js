let asteroids = [];
let spaceShip;

class SpaceShip {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.w = 30;
    this.h = 40;
    this.v = 15;
    this.angle = 0;
    this.b = 50;
    this.end = 0;
  }

  move() {
    if (mouseIsPressed) {
      this.x += this.v * Math.cos((this.angle - 90) * (PI / 180));
      this.y += this.v * Math.sin((this.angle - 90) * (PI / 180));
    }

    if (keyIsDown(32)) {
      this.x += (this.v + 40) * Math.cos((this.angle - 90) * (PI / 180));
      this.y += (this.v + 40) * Math.sin((this.angle - 90) * (PI / 180));
    }

    if (this.x < this.b || this.x > width - this.b) {
      this.x -= this.v * Math.cos((this.angle - 90) * (PI / 180));
    }
    if (this.y < this.b || this.y > height - this.b) {
      this.y -= this.v * Math.sin((this.angle - 90) * (PI / 180));
    }
  }

  rotate() {
    resetMatrix();
    let angleToCursor = atan2(mouseY - this.y, mouseX - this.x);
    this.angle = degrees(angleToCursor) + 90;
  }

  draw() {
    this.move();
    this.rotate();
    fill('#ff00ff');
    rectMode(CENTER);
    push();
    translate(this.x, this.y);
    rotate(((2 * PI) / 360) * this.angle);
    rect(0, 0, this.w, this.h, 0, 0);
    pop();
  }
}

class Asteroid {
  constructor() {
    this.size = 40;
    let i = floor(random(1, 5));
    this.ran = floor(random(8,40));

    switch (i) {
      case 1:
        this.y = -100;
        this.x = random(0, width - this.size);
        break;
      case 2:
        this.x = -100;
        this.y = random(0, height - this.size);
        break;
      case 3:
        this.y = height + 100;
        this.x = random(0, width - this.size);
        break;
      case 4:
        this.x = width + 100;
        this.y = random(0, height - this.size);
        break;
    }

    this.speed = floor(random(8,15));
    this.angle = 0;
    this.radius = this.size / 2;
  }

  move() {
    for (let i = 0; i < asteroids.length; i++) {
      if (i !== asteroids.indexOf(this)) {
        if (
          collideCircleCircle(
            asteroids[i].x,
            asteroids[i].y,
            asteroids[i].radius*2,
            this.x,
            this.y,
            this.radius*2
          )
        ) {
          let angleToOther = atan2(
            asteroids[i].y - this.y,
            asteroids[i].x - this.x
          );
          let newAngle = degrees(angleToOther) + 120;

          this.x -= 5 * Math.cos((newAngle - 90) * (PI / 180));
          this.y -= 5 * Math.sin((newAngle - 90) * (PI / 180));
          return; // Došlo ke kolizi, zabraň pohybu
        }
      }
    }

    this.x += this.speed * Math.cos((this.angle - 90) * (PI / 180));
    this.y += this.speed * Math.sin((this.angle - 90) * (PI / 180));
  }

  rotate() {
    for (let i = 0; i < asteroids.length; i++) {
      if (i !== asteroids.indexOf(this)) {
        if (
          collideCircleCircle(
            asteroids[i].x,
            asteroids[i].y,
            asteroids[i].radius*2,
            this.x,
            this.y,
            this.radius*2
          )
        ) {
          resetMatrix();
          let angleToCursor = atan2(spaceShip.y - this.y, spaceShip.x - this.x);
          this.angle = degrees(angleToCursor) + 180;
          return; // Došlo ke kolizi, zabraň rotaci
        }
      }
    }
    resetMatrix();
    let angleToCursor = atan2(spaceShip.y - this.y, spaceShip.x - this.x);
    this.angle = degrees(angleToCursor) + 90 + this.ran;
  }

  draw() {
    this.move();
    this.rotate();
    push();
    ellipseMode(CENTER);
    translate(this.x + this.size / 2, this.y + this.size / 2);
    rotate(((2 * PI) / 360) * this.angle);
    fill('#ff0000');
    circle(0, 0, this.size);
    pop();
  }
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  spaceShip = new SpaceShip(width / 2, height / 2);
}

function draw() {
  background(0);
  spaceShip.draw();

  if (frameCount % 20 == 0) {
    asteroids.push(new Asteroid());
  }

  asteroids.forEach(function (asteroid, idx, arr) {
    asteroid.draw();
    if (asteroid.y > height) {
      arr.splice(idx, 1);
    }
  });
}

setup();
draw();

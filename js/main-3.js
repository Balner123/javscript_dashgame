
let spaceShip;

/***************************************************************************************************************************/

class SpaceShip {
  /* Konstruktor - speciální metoda, která slouží k inicializaci objektu (pomocí klíčového slova new). */
  constructor(posX, posY) {
    /* Souřadnice pozice kosmické lodi - střed obdélníku */
    this.x = posX;
    this.y = posY;
    /* Šířka lodi */
    this.w = 40;
    /* Výška lodi */
    this.h = 100; 
    /* Rychlost pohybu lodi (v pixelech) */
    this.v = 8;
    /* Úhel rotace lodi (ve stupních) */
    this.angle = 0;
    this.b = 50;
  }

  move() {

    if (mouseIsPressed) {
      this.x += this.v * Math.cos((this.angle-90)* (PI/180));
      this.y += this.v * Math.sin((this.angle-90)* (PI/180)) ;

    }

    if(keyIsDown(32)){
      this.x += (this.v+40) * Math.cos((this.angle-90)* (PI/180));
      this.y += (this.v+40) * Math.sin((this.angle-90)* (PI/180)) ;
    }

    if(this.x<this.b || this.x>width-this.b){this.x -= this.v * Math.cos((this.angle-90)* (PI/180));}
      if(this.y<this.b || this.y>height-this.b){this.y -= this.v * Math.sin((this.angle-90)* (PI/180));}
  }

  rotate() {
    console.log(keyCode ,"kurzor ",mouseX,mouseY  ,"uhel ", this.angle ,"lod ", this.x, this.x); 


 
    resetMatrix();
      let angleToCursor = atan2(mouseY - this.y, mouseX - this.x)
      this.angle = degrees(angleToCursor)+90;
    
      console.log("Kurzor:", mouseX, mouseY, "Úhel:", this.angle, "Lod:", this.x, this.y);
   
    

/*
    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 8;
      
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 8
    }
*/
}

  /* Metoda provádí vykreslení kosmické lodi */
  draw() {
    /* Nejprve je vyvolána metoda move(), aby se ověřil možný pohyb lodi */
    this.move();
    /* Vyvolána metoda rotate() kvůli ověření rotace lodi */
    this.rotate();
    /* Nastavení barvy výplně: https://p5js.org/reference/#/p5/fill */
    fill('#ff0000');
    /* Nastavení pozicování obdélníku: https://p5js.org/reference/#/p5/rectMode */
    /* V tomto případě místo standardní předvolby CORNER (levý horní roh) použijeme CENTER (střed) */
    rectMode(CENTER);
    /* Metodou push() se zahajuje nějaká transformace objektu: uloží se aktuální stav kreslicího režimu */
    /* https://p5js.org/reference/#/p5/push */
    push();
    /* Metodou translate() se přemístí střed transformace do určitého bodu na plátně. */
    /* V našem případě potřebujeme otáčet lodí přesně v jejím středu. */
    /* viz https://p5js.org/reference/#/p5/translate */
    translate(this.x, this.y);
    /* Provedeme rotaci o určený úhel, který musíme převést na radiány */
    /* viz https://p5js.org/reference/#/p5/rotate */
    rotate(((2 * PI) / 360) * this.angle);
    /* Vykreslení obdélníku: https://p5js.org/reference/#/p5/rect */
    /* Kvůli transformaci vykreslujeme obdélník na souřadnicích 0,0 */
    rect(0,0, this.w, this.h, 10, 10);
    /* Metoda pop() vrací kreslicí režim do původního stavu - uloženého metodou push() */
    /* https://p5js.org/reference/#/p5/pop */
    pop();
  }
}

/***************************************************************************************************************************/

function setup() {

  canvas = createCanvas(displayWidth, displayHeight);
  
  spaceShip = new SpaceShip(width/2, height/2);
}

function draw() {
 
  background(0);

  spaceShip.draw();
}
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}

setup();
draw();
class Game {
    constructor(){
        this.player = null;
        this.obstaclesArr = []; // will store instances of the class Obstacle
    }

    start(){
        this.player = new Player();

        this.attachEventListeners();



        // Create new obstacles Gas
        setInterval(() => {
            const astronaut = new Astronaut;
            this.obstaclesArr.push(astronaut);
            }, 1000);

        // Create new obstacles NEBULA
        setInterval(() => {
            const nebula = new Nebula;
            this.obstaclesArr.push(nebula);
        }, 3000);

         // Create new obstacles UFO
        setInterval(() => {
        const ufo = new Ufo;
        this.obstaclesArr.push(ufo);
        }, 5000);

        // Create new obstacles Meteor
        setInterval(() => {
        const meteor = new Meteor;
        this.obstaclesArr.push(meteor);
        }, 10000);

        // Create new obstacles Gas
        setInterval(() => {
        const gas = new Gas;
        this.obstaclesArr.push(gas);
        }, 7000);


        // Update obstacles
        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance, index) => {

                // Move current obstacle
                obstacleInstance.moveDown();

                // Detect collision
                this.detectCollision(obstacleInstance);

                // Detect if obstacle needs to be removed
                this.removeObstacleIfOutside(obstacleInstance, index);

            });
        }, 60);
        setInterval(()=>{console.log(this.obstaclesArr)},5000)
    }

    

    

    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.code === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.code === "ArrowRight") {
                this.player.moveRight();
            } else if (event.code === "ArrowUp") {
                this.player.moveUp();
            } else if (event.code === "ArrowDown") {
                this.player.moveDown();
            }

        })
    }

    detectCollision(obstacleInstance){
        if (obstacleInstance.positionX < this.player.positionX + this.player.width &&
            obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
            obstacleInstance.positionY < this.player.positionY + this.player.height &&
            obstacleInstance.height + obstacleInstance.positionY > this.player.positionY) {
                console.log("Rocket Hit")
        //    this.stopObstacle();
        //    this.removeObstacleIfOutside();
        }
    }



    removeObstacleIfOutside(obstacleInstance, index) {
        if (obstacleInstance.positionY < 0 ) {
    
            // 1. Remove element from the DOM
            obstacleInstance.domElement.remove();
    
            // 2. Remove from the array of obstacles
            this.obstaclesArr.splice(index,1);
            console.log("Obstacle removed")
        }

    }

    


}

/*    stopObstacle() {
        clearInterval(this.obstacleInterval);
        this.stopObstacleMoving();
    }
    

    stopObstacleMoving() {
        this.obstacleInstance.moveDown = false;
    }
  */  
    




class Player {
    constructor(){
        this.width = 3;
        this.height = 15;
        this.positionX = 50 ;
        this.positionY = 0;

        this.domElement = null; // we will store a ref. to the dom element of the player

        this.createDomElement();
    }

    createDomElement(){
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "rocket";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("play-area");
        parentElm.appendChild(this.domElement);
    }

    moveLeft(){
        if (this.positionX > 1) 
        console.log(this)
        this.positionX -= 2; //modify the position
        this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
        
    }
    moveRight(){
        if (this.positionX < 74) 
        console.log(this)
        this.positionX += 2; //modify the position
        this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    }

    moveUp(){
        if (this.positionY < 29) 
        console.log(this)
        this.positionY += 2; //modify the position
        this.domElement.style.bottom = this.positionY + "vw"; //reflect change in the css
        
    }
    moveDown(){
        if (this.positionY >= 1) 
        console.log(this)
        this.positionY -= 2; //modify the position
        this.domElement.style.bottom = this.positionY + "vw"; //reflect change in the css
    }
}


class ObstacleDown {
    constructor() {
      this.speed = "";
      this.width = 4;
      this.height = 6;
      this.positionX = Math.floor(Math.random() * 101); // random number between 0 and 100-this.width;
      this.positionY = 0;
      this.domElement = null;
      this.createDomElement();
    }
  
    createDomElement() {
      this.domElement = document.createElement("div");
      this.domElement.className = "";
      this.domElement.style.width = this.width + "vw";
      this.domElement.style.height = this.height + "vh";
      this.domElement.style.left = this.positionX + "vw";
      this.domElement.style.bottom = this.positionY + "vh";
  
      const parentElm = document.getElementById("play-area");
      parentElm.appendChild(this.domElement);
    }
  
    moveDown() {
      this.positionY -= this.speed;
      this.domElement.style.bottom = this.positionY + "vh";
    }
  }

  
  class Ufo extends ObstacleDown {
    constructor(width, height, className, speed) {
      super();
      this.width = 400;
      this.height = 375;
      this.positionX = Math.floor(Math.random() * 101);
      this.positionY = 100;
      this.domElement.className = "ufo";
      this.speed = 2;
    }
  }

  class Nebula extends ObstacleDown {
    constructor(width, height, className, speed) {
      super();
      this.width = 100;
      this.height = 200;
      this.positionX = Math.floor(Math.random() * 101);
      this.positionY = 100;
      this.domElement.className = "nebula";
      this.speed = 2;
    }
  }

  class Meteor extends ObstacleDown {
    constructor(width, height, className, speed) {
      super();
      this.width = 100;
      this.height = 200;
      this.positionX = Math.floor(Math.random() * 101);
      this.positionY = 100;
      this.domElement.className = "meteor";
      this.speed = 2;
    }
  }

  class Gas extends ObstacleDown {
    constructor(width, height, className, speed) {
      super();
      this.width = 100;
      this.height = 200;
      this.positionX = Math.floor(Math.random() * 101);
      this.positionY = 100;
      this.domElement.className = "gas";
      this.speed = 2;
    }
  }


  class Astronaut extends ObstacleDown {
    constructor(width, height, className, speed) {
      super();
      this.width = 200;
      this.height = 200;
      this.positionX = Math.floor(Math.random() * 101);
      this.positionY = 100;
      this.domElement.className = "astronaut";
      this.speed = 1;
    }
  }

  class HudDisplay {
    constructor() {
      this.width = "";
      this.height = "";
      this.positionX = 0;
      this.positionY = 0;
      this.domElement = null;
      this.createDomElement();
    }
  
    createDomElement() {
      this.domElement = document.createElement("div");
      this.domElement.className = "";
      this.domElement.style.width = this.width + "px";
      this.domElement.style.height = this.height + "px";
      this.domElement.style.left = this.positionX + "px";
      this.domElement.style.top = this.positionY + "px";
  
      const parentElm = document.getElementById("hud-area");
      parentElm.appendChild(this.domElement);
    }
  }

  class Points extends HudDisplay {
    constructor(width, height, className) {
      super();
      this.width = 100;
      this.height = 40;
      this.positionX = 0;
      this.positionY = 0;
      this.domElement.className = "points";

    }
}
  




const game = new Game();
game.start();





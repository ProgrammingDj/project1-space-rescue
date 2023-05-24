class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; // will store instances of the class Obstacle
    this.ufoArr = [];
    this.gasArr = [];
    this.gasProcent = 0;
    this.astronautValue = 0;
    this.totalPoints = 0;

    // simple points mechanism
    this.points = 0;
  }

  start() {
    this.player = new Player();

    this.attachEventListeners();

    // Create new obstacles Gas
    setInterval(() => {
      const astronaut = new Astronaut();
      this.obstaclesArr.push(astronaut);
    }, 1000);

    // Create new obstacles NEBULA
    /*     setInterval(() => {
      const nebula = new Nebula();
      this.obstaclesArr.push(nebula);
    }, 3000); */

    // Create new obstacles UFO
    setInterval(() => {
      const ufo = new Ufo();
      this.ufoArr.push(ufo);
    }, 1000);

    // Create new obstacles Meteor
    /*     setInterval(() => {
      const meteor = new Meteor();
      this.obstaclesArr.push(meteor);
    }, 10000);
 */
    // Create new obstacles Gas
    setInterval(() => {
      const gas = new Gas();
      this.gasArr.push(gas);
    }, 3000);

    // Astronauts
    setInterval(() => {
      this.obstaclesArr.forEach((astronaut, index) => {
        // Move current obstacle
        astronaut.moveDown();

        // Detect collision
        this.detectAstroCollision(astronaut, index);

        // Detect if obstacle needs to be removed
        // this.removeObstacleIfOutside(obstacleInstance, index);
      });
    }, 60);

    setInterval(() => {
      console.log(this.obstaclesArr);
    }, 5000);

    // Ufos
    setInterval(() => {
      this.ufoArr.forEach((ufo, index) => {
        // Move current obstacle
        ufo.moveDown();

        // Detect collision
        this.detectUfoCollision(ufo, index);

        // Detect if obstacle needs to be removed
        // this.removeObstacleIfOutside(obstacleInstance, index);
      });
    }, 60);

    // Gas
    setInterval(() => {
      this.gasArr.forEach((gas, index) => {
        // Move current obstacle
        gas.moveDown();

        // Detect collision
        this.detectGasCollision(gas, index);

        // Detect if obstacle needs to be removed
        // this.removeObstacleIfOutside(obstacleInstance, index);
      });
    }, 60);
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
    });
  }

  detectAstroCollision(astronaut, index) {
    
    if (
      astronaut.positionX < this.player.positionX + this.player.width &&
      astronaut.positionX + astronaut.width > this.player.positionX &&
      astronaut.positionY < this.player.positionY + this.player.height &&
      astronaut.height + astronaut.positionY > this.player.positionY
    ) {
      console.log("Rocket Hit");

      astronaut.domElement.remove();

      this.obstaclesArr.splice(index, 1); //remove from the array

      this.updatePoints(10000);
      this.updateAstronautValue(1)
      document.getElementById("astronautValue").textContent = this.astronautValue.toFixed(0);
    }
  }

  detectUfoCollision(ufo, index) {
    if (
      ufo.positionX < this.player.positionX + this.player.width &&
      ufo.positionX + ufo.width > this.player.positionX &&
      ufo.positionY < this.player.positionY + this.player.height &&
      ufo.height + ufo.positionY > this.player.positionY
    ) {
      console.log("Ufo Hit");

      // ufo.domElement.remove();

      //location.href = "./gameover.html";

      // this.obstaclesArr.splice(index, 1); //remove from the array
    }
  }

  detectGasCollision(gas, index) {
    if (
      gas.positionX < this.player.positionX + this.player.width &&
      gas.positionX + gas.width > this.player.positionX &&
      gas.positionY < this.player.positionY + this.player.height &&
      gas.height + gas.positionY > this.player.positionY
    ) {
      console.log("Gas Collected - WooHoo!");

      gas.domElement.remove();

      this.gasArr.splice(index, 1); //remove from the array

      this.updateGas(50000);
    }
  }

  removeObstacleIfOutside(obstacleInstance, index) {
    if (obstacleInstance.positionY < 0) {
      // 1. Remove element from the DOM
      obstacleInstance.domElement.remove();

      // 2. Remove from the array of obstacles
      this.obstaclesArr.splice(index, 1);
      console.log("Obstacle removed");
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
  pointsDisplay(totalPoints) {
    this.totalPoints = this.updatePoints(points) + this.updateGas(gasProcent);

    document.getElementById("pointsValue").textContent = this.totalpoints.toFixed(0);
  }

  updatePoints(points) {
    this.points += points;
    return console.log(this.points);
  }

  updateAstronautValue(astronautValue) {
  this.astronautValue += astronautValue;
  return console.log(this.astronautValue);
  }

  gasValue() {
    let seconds = Math.floor(1000 * 60) / 1000;
    let gasProcent = Math.round(100 / 60) * seconds;

    setInterval(() => {
      gasProcent -= 100 / seconds;
      if (gasProcent < 0) {
        gasProcent = 0;
      }
      document.getElementById("gasValue").textContent =
        gasProcent.toFixed(0) + "K Liters";
    }, 1000);
  }

  updateGas(gasValue) {
    this.gasProcent += Math.round(gasValue + gasValue / 3);
    document.getElementById("gasValue").textContent = this.gasProcent.toFixed(0);
    return console.log(this.gasProcent);
  }
}

class Player {
  constructor() {
    this.width = 3;
    this.height = 15;
    this.positionX = 50;
    this.positionY = 0;

    this.domElement = null; // we will store a ref. to the dom element of the player

    this.createDomElement();
  }

  createDomElement() {
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

  moveLeft() {
    if (this.positionX > 1) console.log(this);
    this.positionX -= 2; //modify the position
    this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
  }
  moveRight() {
    if (this.positionX < 74) console.log(this);
    this.positionX += 2; //modify the position
    this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
  }

  moveUp() {
    if (this.positionY < 29) console.log(this);
    this.positionY += 2; //modify the position
    this.domElement.style.bottom = this.positionY + "vw"; //reflect change in the css
  }
  moveDown() {
    if (this.positionY >= 1) console.log(this);
    this.positionY -= 2; //modify the position
    this.domElement.style.bottom = this.positionY + "vw"; //reflect change in the css
  }
}

class ObstacleDown {
  constructor() {
    this.speed = "";
    this.width = 4;
    this.height = 6;
    this.positionX = 50; /* Math.floor(Math.random() * 100) */ // random number between 0 and 100-this.width;
    this.positionY = 50;
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
}

class Ufo /* extends ObstacleDown */ {
  constructor(/* width, height, className, speed */) {
    /*    super(); */
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 85;
    this.domElement = null;
    this.speed = 0.5;

    this.createUfoDomElement();
  }

  createUfoDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "ufo";
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

class Nebula extends ObstacleDown {
  constructor(width, height, className, speed) {
    super();
    this.positionX = Math.floor(Math.random() * 101);
    this.positionY = 100;
    this.domElement.className = "nebula";
    this.speed = 2;
  }
}

class Meteor extends ObstacleDown {
  constructor(width, height, className, speed) {
    super();
    this.positionX = Math.floor(Math.random() * 101);
    this.positionY = 100;
    this.domElement.className = "meteor";
    this.speed = 2;
  }
}

class Gas {
  constructor() {
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 85;
    this.domElement = null;
    this.speed = 2;

    this.createGasDomElement(this.positionX);
  }

  createGasDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "gas";
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

class Astronaut /* extends ObstaclceDown */ {
  constructor() {
    /*    super(); */
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 85;
    this.domElement = null;

    //this.domElement.className = "astronaut";
    this.speed = 1;

    this.createAstroDomElement(this.positionX);
  }

  createAstroDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "astronaut";
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

game.gasValue();

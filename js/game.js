
class Game {
  constructor() {
    this.player = null;
    this.astronautArr = [];
    this.ufoArr = [];
    this.satelliteArr = [];
    this.meteorArr = [];
    this.nebulaArr = [];
    this.gasArr = [];
    this.gasProcent = 0;
    this.astronautValue = 0;
    this.timePoints = 0;
    this.astronautPoints = 0;
    this.totalPoints = 0;
    this.points = 0;
  }


  start() {
    this.player = new Player();

    this.attachEventListeners();

    // Create new obstacles Gas
    setInterval(() => {
      const astronaut = new Astronaut();
      this.astronautArr.push(astronaut);
      this.updateTimePoints();
    }, 1000);

    // Create new obstacles NEBULA
    setInterval(() => {
      const nebula = new Nebula();
      this.nebulaArr.push(nebula);
    }, 1000);

    // Create new obstacles UFO
    setInterval(() => {
      const ufo = new Ufo();
      this.ufoArr.push(ufo);
    }, 3000);

    // Create new obstacles Meteor
    setInterval(() => {
      const meteor = new Meteor();
      this.meteorArr.push(meteor);
    }, 10000);
 
    // Create new obstacles Gas
    setInterval(() => {
      const gas = new Gas();
      this.gasArr.push(gas);
    }, 7000);

    // Create new obstacles Satellite
    setInterval(() => {
      const satellite = new Satellite();
      this.satelliteArr.push(satellite);
    }, 15000);
  

    // Astronauts
    setInterval(() => {
        this.astronautArr.forEach((astronaut, index) => {
        // Move current obstacle
        astronaut.moveDown();

        // Detect collision
        this.detectAstronautCollision(astronaut, index);

        // Detect if obstacle needs to be removed
        this.removeAstronautIfOutside(astronaut, index);
      });
    }, 60);


    // Ufos
    setInterval(() => {
        this.ufoArr.forEach((ufo, index) => {
        // Move current obstacle
        ufo.moveDown();

        // Detect collision
        this.detectUfoCollision(ufo, index);

        // Detect if obstacle needs to be removed
        this.removeUfoIfOutside(ufo, index);
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
        this.removeGasIfOutside(gas, index);
      });
    }, 60);

    // Meteor
    setInterval(() => {
        this.meteorArr.forEach((meteor, index) => {
        // Move current obstacle
        meteor.moveDown();

        // Detect collision
        this.detectMeteorCollision(meteor, index);

        // Detect if obstacle needs to be removed
        this.removeMeteorIfOutside(meteor, index);
      });
    }, 60);

    // Nebula
    setInterval(() => {
        this.nebulaArr.forEach((nebula, index) => {
        // Move current obstacle
        nebula.moveDown();

        // Detect collision
        this.detectNebulaCollision(nebula, index);

        // Detect if obstacle needs to be removed
        this.removeNebulaIfOutside(nebula, index);
      });
    }, 60);

    // Satellite
    setInterval(() => {
      this.satelliteArr.forEach((satellite, index) => {
        // Move current obstacle
        satellite.moveLeft();

        // Detect collision
        this.detectSatelliteCollision(satellite, index);

        // Detect if obstacle needs to be removed
        this.removeSatelliteIfOutside(satellite, index);
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

  detectAstronautCollision(astronaut, index) {
    
    if (
      astronaut.positionX < this.player.positionX + this.player.width &&
      astronaut.positionX + astronaut.width > this.player.positionX &&
      astronaut.positionY < this.player.positionY + this.player.height &&
      astronaut.height + astronaut.positionY > this.player.positionY
    ) {
      console.log("Astronaut collected, yeah");

      astronaut.domElement.remove();

      this.astronautArr.splice(index, 1); //remove from the array

      this.updateAstronautPoints();
      document.getElementById("pointsValue").textContent = this.totalPoints.toFixed(0);
      this.updateAstronautValue(1);
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

      ufo.domElement.remove();
      this.ufoArr.splice(index, 1); //remove from the array

      location.href = "./gameover.html";

      
    }
  }

  detectMeteorCollision(meteor, index) {
    if (
      meteor.positionX < this.player.positionX + this.player.width &&
      meteor.positionX + meteor.width > this.player.positionX &&
      meteor.positionY < this.player.positionY + this.player.height &&
      meteor.height + meteor.positionY > this.player.positionY
    ) {
      console.log("Meteor Hit");

      meteor.domElement.remove();
      this.meteorArr.splice(index, 1); //remove from the array

      location.href = "./gameover.html";

      
    }
  }

  detectNebulaCollision(nebula, index) {
    if (
      nebula.positionX < this.player.positionX + this.player.width &&
      nebula.positionX + nebula.width > this.player.positionX &&
      nebula.positionY < this.player.positionY + this.player.height &&
      nebula.height + nebula.positionY > this.player.positionY
    ) {
      console.log("Nebula Hit");

      nebula.domElement.remove();
      this.nebulaArr.splice(index, 1); //remove from the array

      location.href = "./gameover.html";

      
    }
  }

  detectSatelliteCollision(satellite, index) {
    if (
      satellite.positionX < this.player.positionX + this.player.width &&
      satellite.positionX + satellite.width > this.player.positionX &&
      satellite.positionY < this.player.positionY + this.player.height &&
      satellite.height + satellite.positionY > this.player.positionY
    ) {
      console.log("Satellite Hit");

      satellite.domElement.remove();
      this.satelliteArr.splice(index, 1); //remove from the array

      location.href = "./gameover.html";

      
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
      this.gasProcent += 30;
      document.getElementById("gasValue").textContent = this.gasProcent.toFixed(0) + "L";
      this.updateGasPoints();
      this.gasArr.splice(index, 1); //remove from the array
    
      
      return true;
    }
  }

  removeAstronautIfOutside(astronautInstance, index) {
    if (astronautInstance.positionY < 0) {
      // 1. Remove element from the DOM
      astronautInstance.domElement.remove();

      // 2. Remove from the array of astronaut
      this.astronautArr.splice(index, 1);
      console.log("Astronaut removed outside");
    }
  }

  removeGasIfOutside(gasInstance, index) {
    if (gasInstance.positionY < 0) {
      // 1. Remove element from the DOM
     gasInstance.domElement.remove();

      // 2. Remove from the array of gas
      this.gasArr.splice(index, 1);
      console.log("Gas removed outside");
    }
  }

  removeUfoIfOutside(ufoInstance, index) {
    if (ufoInstance.positionY < 0) {
      // 1. Remove element from the DOM
      ufoInstance.domElement.remove();

      // 2. Remove from the array of ufo
      this.ufoArr.splice(index, 1);
      console.log("Ufo removed outside");
    }
  }

  removeMeteorIfOutside(meteorInstance, index) {
    if (meteorInstance.positionY < 0) {
      // 1. Remove element from the DOM
      meteorInstance.domElement.remove();

      // 2. Remove from the array of meteor
      this.meteorArr.splice(index, 1);
      console.log("Meteor removed outside");
    }
  }

  removeNebulaIfOutside(nebulaInstance, index) {
    if (nebulaInstance.positionY < 0) {
      // 1. Remove element from the DOM
      nebulaInstance.domElement.remove();

      // 2. Remove from the array of nebula
      this.nebulaArr.splice(index, 1);
      console.log("Nebula removed outside");
    }
  }

  removeSatelliteIfOutside(satelliteInstance, index) {
    if (satelliteInstance.positionX < 0) {
      // 1. Remove element from the DOM
      satelliteInstance.domElement.remove();

      // 2. Remove from the array of nebula
      this.satelliteArr.splice(index, 1);
      console.log("Satellite removed outside");
    }
  }
    updateTimePoints(){
        this.totalPoints += 1000; 
        document.getElementById("pointsValue").textContent =
        Math.round(this.totalPoints).toFixed();
      }

    updateGasPoints() {
      this.totalPoints += 50000;
      document.getElementById("pointsValue").textContent =
      Math.round(this.totalPoints).toFixed();
      return this.totalPoints;
    }

    pointsDisplay() {
      this.totalPoints += this.updateAstronautPoints(astronautValue) + this.updateGasPoints() + this.timePoints();
      document.getElementById("pointsValue").textContent = this.thisPoints.toFixed(0);
      return this.totalPoints;
    }

    updateAstronautPoints(points) {
      this.totalPoints += 10000;
      return this.totalPoints;
    }

    updateAstronautValue(astronautValue) {
      this.astronautValue += astronautValue;
      return this.astronautValue;
    }

    gasValue() {
      let seconds = Math.floor(1000 * 60) / 1000;
      this.gasProcent = (Math.round(100 / 60) * seconds) / 1.2;
      
    
      setInterval(() => {
        this.gasProcent -= 100 / seconds;
        if (this.gasProcent > 0) {
          this.gasProcent++;
        } else {
          location.href = "./gameover.html";
        }
        document.getElementById("gasValue").textContent =
          Math.round(this.gasProcent).toFixed() + "L";
      }, 1000);
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
    console.log(this);
    if (this.positionX > 2) 
    {this.positionX -= 2;} //modify the position
    this.domElement.style.left = this.positionX + "vw"; 
  }
  moveRight() {
    console.log(this);
    if (this.positionX + this.width < 77) 
    {this.positionX += 2;} //modify the position
    this.domElement.style.left = this.positionX + "vw"; 
  }

  moveUp() {
    console.log(this)
    if (this.positionY + this.height < 65)
    {this.positionY += 2;} //modify the position
    this.domElement.style.bottom = this.positionY + "vh"; 
  }
  moveDown() {
    console.log(this);
    if (this.positionY >= 1) 
    {this.positionY -= 2;} //modify the position
    this.domElement.style.bottom = this.positionY + "vh"; 
  }


}

class Ufo {
  constructor() {
    
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 60;
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

class Nebula {
  constructor() {
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 60;
    this.domElement = null;
    this.speed = 0.5;

    this.createUfoDomElement();
  }

  createUfoDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "nebula";
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

class Meteor {
  constructor() {
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 60;
    this.domElement = null;
    this.speed = 2;

    this.createMeteorDomElement();
  }

  createMeteorDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "meteor";
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

class Satellite {
  constructor() {
    this.width = 4;
    this.height = 6;
    this.positionX = 70;
    this.positionY = Math.floor(Math.random() * 60);
    this.domElement = null;
    this.speed = 1;

    this.createSatelliteDomElement();
  }

  createSatelliteDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "satellite";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("play-area");
    parentElm.appendChild(this.domElement);
  }

  moveLeft() {
    this.positionX -= this.speed;
    this.domElement.style.left = this.positionX + "vw";
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

class Astronaut {
  constructor() {
    this.width = 4;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 60;
    this.domElement = null;

    this.speed = 1;

    this.createAstronautDomElement(this.positionX);
  }

  createAstronautDomElement() {
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
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.top = this.positionY + "vh";

    const parentElm = document.getElementById("hud-area");
    parentElm.appendChild(this.domElement);
  }
}

class Points extends HudDisplay {
  constructor() {
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





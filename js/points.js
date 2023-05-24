
function pointsCollector() {

}

function gasValue() {
    let seconds = Math.floor(1000 * 60) / 1000;
    let gasProcent = Math.round(100 / 60) * seconds;
  
    setInterval(() => {
      gasProcent -= 100 / seconds;
      if (gasProcent < 0) {
        gasProcent = 0;
      }
      document.getElementById("gasValue").textContent = gasProcent.toFixed(0) + "K Liters";
    }, 1000);
  }
  
  gasValue();


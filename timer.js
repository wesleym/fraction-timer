var totalTime;
var maxDenominator = 65536;
var currentDenominator = maxDenominator;
var startTime;

function start() {
  totalTime = document.querySelector('#total-time').value;
  requestAnimationFrame(initAnimation);
}

function initAnimation(time) {
  startTime = time;
  requestAnimationFrame(tickDown);
}

function tickDown(time) {
  time -= startTime;
  while (1 / currentDenominator < time / totalTime) {
    currentDenominator--;
  }
  currentDenominator++;
  document.querySelector('#fraction').innerText = '1 / ' + currentDenominator
  var fraction = time / totalTime - 1 / currentDenominator
  var interval = 1 / (currentDenominator - 1) - 1 / currentDenominator
  document.querySelector('#progress').value = fraction / interval
  var currTime = fraction * totalTime
  var intervalTime = interval * totalTime
  document.querySelector('#time').innerText = (currTime / 1000).toFixed(4) + ' / ' + (intervalTime / 1000).toFixed(4)
  if (time <= totalTime / 2) {
    requestAnimationFrame(tickDown);
  } else {
    requestAnimationFrame(tickUp);
  }
}

function tickUp(time) {
  time -= startTime;
  while (1 - (1 / currentDenominator) < time / totalTime) {
    currentDenominator++;
    if (currentDenominator > maxDenominator) {
      break;
    }
  }
  currentDenominator--;
  document.querySelector('#fraction').innerText = '1 / ' + currentDenominator
  var fraction = time / totalTime - (1 - 1 / currentDenominator)
  var interval =  1 / (currentDenominator) - 1 / (currentDenominator + 1)
  document.querySelector('#progress').value = fraction / interval
  var currTime = fraction * totalTime
  var intervalTime = interval * totalTime
  document.querySelector('#time').innerText = (currTime / 1000).toFixed(4) + ' / ' + (intervalTime / 1000).toFixed(4)
  if (time <= totalTime / 2) {
    requestAnimationFrame(tickDown);
  } else if (time <= totalTime) {
    requestAnimationFrame(tickUp);
  }
}

var hundredth = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var run = false;
var timer; // it needed to be declared globally. The stopwatch wouldn't pause otherwise.

var msecDisp = document.getElementById("msec");
var secDisp = document.getElementById("sec");
var minDisp = document.getElementById("min");
var hrDisp = document.getElementById("hr");
var playBtn = document.getElementsByClassName("material-symbols-rounded")[0];

var lapCount = 0;
var initTimestamp = new Date(1599507000000);
var timeStamps = [initTimestamp];
var timeDiff = [];
var total = [];

function toggleTimer() {
  if(run) {
    clearInterval(timer);
    playBtn.innerHTML = "play_arrow";
    run = false;
  } else {
    timer = setInterval(count, 10);
    playBtn.innerHTML = "pause";
    run = true;
  }
}

function resetTimer() {
  clearInterval(timer);
  playBtn.innerHTML = "play_arrow";
  msecDisp.innerHTML = "00";
  secDisp.innerHTML = "00.";
  minDisp.innerHTML = "00:";
  hrDisp.innerHTML = "00:";
  hundredth = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  run = false;

  lapCount = 0;
  initTimestamp = new Date(1599507000000);
  timeStamps = [initTimestamp];
  timeDiff = [];
  total = [];

  var parent = document.getElementById("recData");
  var childs = document.getElementById("recData").getElementsByTagName("tr");

  for(var x = 0;x<childs.length;x+1){ 
    parent.removeChild(childs[x]);
  }
  document.getElementById("recTable").style.visibility = "hidden";
}

function count() {
  hundredth += 1;
  if(hundredth === 100) {
    hundredth = 0;
    seconds += 1;
  }
  if(seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  if(minutes === 60) {
    minutes = 0;
    hours += 1;
  }  
  disp(hundredth, seconds, minutes, hours);
}

function disp(hun, sec, min, hr) {
  msecDisp.innerHTML = hun.toLocaleString(undefined, {minimumIntegerDigits: 2});
  secDisp.innerHTML = sec.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ".";
  minDisp.innerHTML = min.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":";
  hrDisp.innerHTML = hr.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":";
}

function recordData() {
  lapCount += 1;
  var currentTimeStamp = new Date(2020, 08, 08 , hours, minutes, seconds, hundredth);
  timeStamps.push(currentTimeStamp);
  timeDiff.push(timeStamps[lapCount].getTime() - timeStamps[lapCount - 1].getTime());
  var time = new Date(2020, 08, 08 , 0, 0, 0, timeDiff[lapCount - 1]) 

  var newRow = document.createElement("tr");
  var newLap = document.createElement("td");
  var newTime = document.createElement("td");
  var newTotal = document.createElement("td");

  let hundFix = time.getMilliseconds() >= 900 ? 
    Math.round(time.getMilliseconds() / 10) : 
    time.getMilliseconds();

  newLap.innerHTML = lapCount;

  newTime.innerHTML = 
  time.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}) +
  ":" + time.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2}) +
  ":" + time.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2}) +
  "." + hundFix;

  newTotal.innerHTML = hours.toLocaleString(undefined, {minimumIntegerDigits: 2}) + 
  ":" + minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}) + 
  ":" + seconds.toLocaleString(undefined, {minimumIntegerDigits: 2}) + 
  "." + hundredth.toLocaleString(undefined, {minimumIntegerDigits: 2});

  newRow.appendChild(newLap);
  newRow.appendChild(newTime);
  newRow.appendChild(newTotal);

  document.getElementById("recData").insertBefore(
    newRow, 
    document.getElementById("recData").childNodes[0]
  );
  document.getElementById("recTable").style.visibility = "visible";
}
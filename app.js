let seconds = 00; 
let tens = 00; 
let tableRow = '';
let tableData1 = '';
let tableData2 = '';
let tableData3 = '';
let Interval ;
let runTimer = 0;
let randomNumber = 0;

let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let buttonStart = document.getElementById('button-start');
let buttonStop = document.getElementById('button-stop');
let buttonReset = document.getElementById('button-reset');
let timeDisplay = document.getElementById('timeDisplay');
let gameOver = document.getElementById('gameOver');
let winners = document.getElementById('winners');
let playerTable = document.getElementById('playerTable');
let countStarter = document.getElementById('showIntro');

const data = [
  {flag:'<img src=/img/greatbritan.png width = 20px>' + ' - Great Britain', name:'Mohamed Farah', time: 0},
  {flag:'<img src=/img/kenya.png width = 20px>' + ' - Kenya', name:'Paul Kipngetich Tanui', time: 0},
  {flag:'<img src=/img/usa.png width = 20px>' + ' - USA', name:'Galen Rupp', time: 0},
  {flag:'<img src=/img/uganda.png width = 20px>' + ' - Uganda', name:'Joshua Kiprui Cheptegei', time: 0},
  {flag:'<img src=/img/newzealand.png width = 20px>' + ' - New Zealand', name:'Zane Robertson', time: 0},
  {flag:'<img src=/img/australia.png width = 20px>' + ' - Australia', name:'David Mcneill', time: 0},
  {flag:'<img src=/img/japan.png width = 20px>' + ' - Japan', name:'Suguru Osako', time: 0}
  ];

window.onload = function(){
  currentTimer();
  addUser();
  };

function currentTimer(){ // Displays Current Time
  let currentTime = new Date();
  timeDisplay.innerHTML = currentTime.toLocaleTimeString();
}
setInterval(currentTimer, 1000);

function addUser(){  // Adds Player

  data.forEach(function(e, index){
    tableRow = document.createElement('tr');
    tableData1 = document.createElement('td');
    tableData2 = document.createElement('td');
    tableData3 = document.createElement('td');
    playerTable.appendChild(tableRow);
    playerTable.appendChild(tableData1);
    playerTable.appendChild(tableData2);
    playerTable.appendChild(tableData3);
    tableData1.innerHTML=`${data[index].flag}`+ '<hr>';
    tableData2.innerHTML=`${data[index].name}`+ '<hr>';
    tableData3.innerHTML=`${data[index].time}` + ' mps'+ '<hr>';
  });
}
  
function startT() { // Starts Timer
  buttonStart.className = 'btn btn-success btn-lg mx-2 disabled';
  buttonStop.className = 'btn btn-danger btn-lg mx-2';
  buttonReset.className = 'btn btn-warning btn-lg mx-2 disabled';
  clearInterval(Interval);
  Interval = setInterval(startTimer, 100);
  addRunner(); // spiderman running
    }
    function startTimer () {
      tens++; 
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      if (tens > 9){
        appendTens.innerHTML = tens;
      } 
      if (tens > 59) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    }

  function stopTimer() { // Stops Timer
      buttonStart.className = 'btn btn-success btn-lg mx-2 disabled';
      buttonStop.className = 'btn btn-danger btn-lg mx-2 disabled';
      buttonReset.className = 'btn btn-warning btn-lg mx-2';
      playerTable.innerHTML = '';
      runTimer = seconds + tens;
      randomTimer();
      sortPlayer();
      clearInterval(Interval);
      resetTimer();
      footerInfo.innerHTML ='';
      gameOver.innerHTML = 'GAME OVER';
    }    

  function resetT() {
      buttonStart.className = 'btn btn-success btn-lg mx-2';
      buttonStop.className = 'btn btn-danger btn-lg mx-2 disabled';
      buttonReset.className = 'btn btn-warning btn-lg mx-2 disabled';
      clearInterval(Interval);
      tens = "00";
      seconds = "00";
      appendTens.innerHTML = tens;
      appendSeconds.innerHTML = seconds;
      playerTable.innerHTML = '';
      resetTimer();
      addUser();
      footerInfo.innerHTML = '';
      gameOver.innerHTML = '';
      winners.innerHTML = '';
}
          
function sortPlayer(e, index){ // Sorts Player from least amount of time to first the race.
  data.sort((a, b) => a.time - b.time);
  addUser();
  medalColor();
};

function randomTimer(){
  data.forEach(function(e, index){
    randomNumber = parseInt(Math.random() * 20) + 1;
    data[index].time = randomNumber;
  });
};

function resetTimer(){
  data.forEach(function(e, index){
    data[index].time = 0;
  });
};

let footerInfo = document.getElementById('footerInfo');
function addRunner(e){
let runner = document.createElement('marquee');
footerInfo.innerHTML = '<marquee behavior="scroll" direction="right" scrollamount="50"><img src="/img/SpiderRunning.gif" alt="Running Man" srcset="" width="400px"></marquee>';
}

function medalColor(e){
let tableRows = document.querySelectorAll('td'); // variable name should be tableCell
for(let i = 0; i < 3; i++){
  tableRows[i].style.background='#FFD700';
  tableRows[i].style.color='black';
  tableRows[i].style.fontWeight = 'bold';
  winners.innerHTML = 'Gold Medal Winner -- ' + tableRows[1].textContent;
}
for(let i = 3; i < 6; i++){
  tableRows[i].style.background='#C0C0C0';
  tableRows[i].style.color='black';
  tableRows[i].style.fontWeight = 'bold';
}
for(let i = 6; i < 9; i++){
  tableRows[i].style.background='#CD7F32';
  tableRows[i].style.color='black';
  tableRows[i].style.fontWeight = 'bold';
}
}

function showIntro(){
  countStarter.className = 'rounded-circle'; // shows the 321 image.
  setTimeout(hide, 6000);
  setTimeout(startT, 6000);
}

function hide(){
  countStarter.className = 'rounded-circle d-none'; // hides the image again.
}


buttonStart.addEventListener('click', showIntro);
buttonStop.addEventListener('click', stopTimer);
buttonReset.addEventListener('click', resetT);
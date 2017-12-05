var round = 1;
var chScore = 0;
var aiCh = "";


function main(chScore, round){
    
  while (round < 5) {
    
  
    if (round == 1 & chScore == 0){
    chScore = rand();
    }
    direct(chScore, round);

    // display AI choice
    
    // get user input
    
    // if user pick correct increment chScore by 2 
    
    // if user pick incorrect increment ch score by 1 
    
    // increment round
 }
}

function rand(){
  return Math.floor(Math.random() * 2) + 1; 
}

function direct(chScore) {
  if (chScore % 2 == 0) {
    aiCh = "Right";
  }
  else {
    aiCh = "Left";
  }
}
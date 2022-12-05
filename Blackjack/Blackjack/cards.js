let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two', 'One'
];

let messageArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';

let gameStart = false,
  gameisOver = false,
  playWon = false,
  CardAreadealer = [],
  gamerCards = [],
  dealerScore = 0,
  gamerScore = 0,
  deck = [];

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameisOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  CardAreadealer = [getNextCard(), getNextCard()];
  gamerCards = [getNextCard(), getNextCard()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

function createDeck() {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  gamerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameisOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame(){
  updateScores();
  
  if(gameisOver){
    while(dealerScore<gamerScore &&
          gamerScore <=21 &&
          dealerScore <=21){
            CardAreadealer.push(getNextCard());
            updateScores();
    }
  }
    
    if(gamerScore>21){
      playerWon=false;
      gameisOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      gameisOver = true;
    }
    
    else if(gameisOver){
      if(gamerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}
function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10; 
  }
}
function showStatus()
{
  if(!gameStarted)
  {
    messageArea.innerText = 'Blackjack!';
    return; 
  }
  
  let dealerCardString = '';
  for(let i=0; i<CardAreadealer.length; i++)
  {
    dealerCardString += getCardString(CardAreadealer[i]) + '\n';
  }
  let playerCardString='';
  for(let i=0; i<gamerCards.length; i++)
  {
    playerCardString += getCardString(gamerCards[i]) + '\n';
  }
  
  updateScores();
  
  messageArea.innerText = 'Dealer has:\n' +
                        dealerCardString + 
                        '(score: ' + dealerScore + ')\n\n' +
                        
                        'Player has:\n' +
                        playerCardString + 
                        '(score: ' + gamerScore + ')\n\n';
                        
  if(gameisOver){
    if(playerWon)
    {
      messageArea.innerText += "YOU WIN!";
    }
    else{
      messageArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'Ace'){
      hasAce = true;
    }
    
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}

function updateScores(){
  dealerScore = getScore(CardAreadealer);
  gamerScore = getScore(gamerCards); 
}

function getNextCard() {
  return deck.shift();
}

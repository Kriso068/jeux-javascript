

//nous récuperons les id grace au getElementById 
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

//nous récupérons tous les buttons avec le querySelector
const possibleChoices = document.querySelectorAll('button');

//on déclare les variables
let userChoice;
let computerChoice;
let result;

//nous faisons un forEach avec addEventListener au click pour instancier les variable definis
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=>{

    userChoice = e.target.id;

    //on affiche le choix du user après avoir ecouté le addEventListener click
    userChoiceDisplay.innerHTML = userChoice;
    //on affiche la fonction generateComputerChoice() et getResult()
    generateComputerChoice()
    getResult();

}))

function generateComputerChoice(){
    
    //on instancie randomNumber avec la longueur du tableau possibleChoices qui est de 3 ici (rock-paper-scissors)
    const randomNumber = Math.floor(Math.random() * possibleChoices.length )+ 1;

    //si randomNumber est  strictement egal à 1 alors computerChoice prend la valeur de 'rock'
    if(randomNumber === 1){
        computerChoice = "rock";
    }

    //si randomNumber est  strictement egal à 2 alors computerChoice prend la valeur de 'paper'
    if(randomNumber === 2){
        computerChoice = "paper";
    }

    //si randomNumber est  strictement egal à 3 alors computerChoice prend la valeur de 'scissors'
    if(randomNumber === 3){
        computerChoice = "scissors";
    }
    
    //computerChoiceDisplay affiche le resultat de computerChoice defini juste avant
    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult(){
    
    if(computerChoice === userChoice){
        result = "it's a DRAW !";
    }
    if(computerChoice === 'rock' && userChoice === 'paper'){
        result = "you WIN !";
    }
    if(computerChoice === 'paper' && userChoice === 'scissors'){
        result = "you WIN !";
    }
    if(computerChoice === 'scissors' && userChoice === 'rock'){
        result = "you WIN !";
    }
    if(computerChoice === 'rock' && userChoice === 'scissors'){
        result = "you LOSE !";
    }
    if(computerChoice === 'paper' && userChoice === 'rock'){
        result = "you LOSE !";
    }
    if(computerChoice === 'scissors' && userChoice === 'paper'){
        result = "you LOSE !";
    }

    resultDisplay.innerHTML = result
}
    
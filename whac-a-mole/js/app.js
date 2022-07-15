

//on recupère les types de class ou id et on instancie nos constantes
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPostion;
let currentTime = 60;
let temerId = null;


//definir une fonction qui enlenve le 'mole' dans toutes les cases
function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })
    //on recupere dans 'randomSquares' la constantes sqaures aléatoirement avec la fonction 'Math.floor(Math.random() *9)' et nous definition entre 0 et 9 car ici nous avon neuf squares 
    let randomSquare = squares[Math.floor(Math.random() *9)];
    // nous instancions randonSquares avec la class 'mole
    randomSquare.classList.add('mole');

    //nous recuperons id du 'square'
    hitPostion = randomSquare.id;
}

squares.forEach(square =>{

    //quand on click sur le sqaure
    square.addEventListener('click', () =>{

        //si sqaure id est egqle a hitPositon alors on incermante de 1 result on affiche le scrore avec le total de result et on reset hitPosition a null
        if(square.id == hitPostion){
            result++;
            score.innerHTML = result;
            hitPostion = null;
        }
    })
})

// fonction servant a deplacer le 'mole' toutes les 500 millisecond en metant en argument la function randomSquare()
function moveMole(){ 
    temerId = setInterval(randomSquare, 550)
}

moveMole();

function countDwon(){
    //on decremente le curentime qui a été instancier a 60
    currentTime--
    //on affiche le curenTime dans la constante timeLeft
    timeLeft.innerHTML = currentTime;

    //quand le curenTime atteind 0 on affiche un message et on reset le temp
    if(currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(temerId)
        alert('GAME OVER ! Your final scire is ' +result);   
    }
}


let countDownTimerId = setInterval(countDwon, 1000);
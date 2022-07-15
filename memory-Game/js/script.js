

//Création d'un tableau avec des images
const cardArray = [
    {
        name: 'fries',
        img:  'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img:  'images/cheeseburger.png',
        },
    {
        name: 'hotdog',
        img:  'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img:  'images/ice-cream.png',
    },
    {
        name: 'pizza',
        img:  'images/pizza.png',
    },
    {
        name: 'milkshake',
        img:  'images/milkshake.png',
    },
    {
        name: 'fries',
        img:  'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img:  'images/cheeseburger.png',
        },
    {
        name: 'hotdog',
        img:  'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img:  'images/ice-cream.png',
    },
    {
        name: 'pizza',
        img:  'images/pizza.png',
    },
    {
        name: 'milkshake',
        img:  'images/milkshake.png',
    },
];

//nous mélangeons le tableau de facon aléatoire le 0.5 fait en sorte de trier ce en-dessous et au-dessus de 0.5
cardArray.sort(() => 0.5 - Math.random());

// nous allons chercher la valeur grid dans le document 
const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');

//nous faisons des tableaux vides
let cardChosen = [];
let cardChosenId = [];
const cardWon = [];


function createBoard(){

    //pour i allant de 0 a 10
    for(let i = 0; i < cardArray.length; i++){

        //nous créons un élément de type img
        const card = document.createElement('img');
        //on lui met un attribut src
        card.setAttribute('src', 'images/blank.png');
        //on lui met data id unique pour chaque carte
        card.setAttribute('data-id', i);

        //quand on clique sur card on appel la function flipCard
        card.addEventListener('click', flipCard)

        //on le fait apparaitre card dans griddisplay
        gridDisplay.appendChild(card);
        console.log(card)
    }
}

createBoard();

function checkMatch(){

    //on recupère toutes les img dans la dic id grid
    const cards = document.querySelectorAll('#grid img')


    const optionOneId = cardChosenId[0];
    const optionTwoId = cardChosenId[1];

    if(optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('you found two same images !');
    }

    //si dans le tableau cardChosen a l'index 0 et que dans cardChosen a l'index 1 est le meme alors
    if(cardChosen[0] == cardChosen[1]){

        //on set une image blanche a l'index 0 et 1
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');

        //on enleve le addEventListener pour les carte trouvées
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        //on push dans le tableau cardWon les cartes trouvées
        cardWon.push(cardChosen);
    }else{
        //on retourne la catre a l'image d'origine
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }

    resultDisplay.textContent = cardWon.length
    //on reset les tableau a vide
    cardChosen = [];
    cardChosenId = [];

    //si le tableau cardWon est egale au tableau cardArray divisé par deux alors
    if(cardWon.length == cardArray.length/2){

        resultDisplay.innerHTML = 'Congratulations you have them all';
    }
}

function flipCard(){

    //this fait appel à la carte cliquée et nous recupérons sont ID
    const cardId =this.getAttribute('data-id');

    //on push dans le tableau cardChosen le nom de la carte
    cardChosen.push(cardArray[cardId].name);
    //on push dans le tableau cardChosenID la cardId
    cardChosenId.push(cardId)

    //on lui dit d'afficher l'img du tableau cardArray avec ID en question et l'imgae qui va avec
    this.setAttribute('src', cardArray[cardId].img);

    //si dans le tableau il y a deux fois la meme valeur strict
    if(cardChosen.length === 2){

        //faire appel a la fonction checkMatch et lui mettre un timer en millisecond
        setTimeout(checkMatch, 500);
    }
    console.log(cardChosen)
    console.log(cardChosenId)
    console.log('clicked', cardId)
}

//on recupère la class grid 
const grid = document.querySelector('.grid')

//define the score
const scoreDisplay = document.querySelector('#score')

//nous deffinissons la hauteur et la largeur de nos blocks
const blockWidth = 100
const blockHeight = 20

//nous definissons le diamter de la balle
const ballDiameter = 20

//on lui dit que la largeur max du grid est de 560px  
const boardWidth = 560
//on lui dit que la hauter max du grid est de 300px  
const boardHeight = 300

//Direction
let xDirection = -2
let yDirection = 2

//nous definission l'endroit par defaut de la barre user
const userStart = [230, 10]
//on definis la possition actuel avec l'endroit par defaut
let currentPosition = userStart

//nous definission l'endroit par defaut de la balle
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0

//my block
class Block {

    //this fait appel a la class 
    //xAxis= horizontalement
    //yAxis= verticalement
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        //on creer des div 
        const block = document.createElement('div')
        //on ajoute la class block au div block
        block.classList.add('block')
        //on ajoute du style ici nous appelon le tableau blocks et nous injection la class block
        block.style.left = blocks[i].bottomLeft[0] + 'px'  
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
        //on ajoute a la grid l'enfant block
        grid.appendChild(block)
        console.log(blocks[i].bottomLeft)
    }
}
addBlocks()

//add user
//nous creons la div user 
const user = document.createElement('div')
//nous lui donnons une class
user.classList.add('user')
//oon ajoute a la grid l'enfant user
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move user
function moveUser(e) {
    //on ecoute l'evenement et on parcour les switch case
    switch (e.key) {
        //si arrowLeft alors on deplace la curentPosition de -10 px 
        case 'ArrowLeft':
            //tant que currentPositon est superieur a 0 alors on
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                console.log(currentPosition[0] > 0)
                drawUser()   
            }
        break
        case 'ArrowRight':
            //tant que currentPositon est superieur a 0 alors on
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 10
                console.log(currentPosition[0])
                drawUser()   
            }
        break
    }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
    //nous mettons en place la position de la bare user
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
    //nous mettons en place la position de la bare user
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

//check for collisions
function checkForCollisions() {
  //check for block collision
    for (let i = 0; i < blocks.length; i++){
        if
            (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
            )
        {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()   
            score++
            scoreDisplay.innerHTML = score

            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'You Win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }
    // check for wall hits
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
    {
        changeDirection()
    }

    //check for user collision
    if
    (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
    )
    {
        changeDirection()
    }

    //game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser)
    }
}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}
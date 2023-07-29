// game constant and Variables
let inputDir = {x: 0, y: 0};
let foodSound = new Audio("../music/food.mp3");
let moveSound = new Audio("../music/move.mp3");
let gameoverSound = new Audio("../music/gameover.mp3");
let musicSound = new Audio("../music/music.mp3");
let score = 0;
let lastPaintTime = 0;
let speed = 6;
let snakeArr =[
    {x: 13 , y: 15}
] 
let food = {x: 11 , y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main); 
    // console.log(ctime);   this render files in a very fast speed to control the speed of render page we apply a if condition in which if given condition is true than ctime donot work , /1000 is do because it give time in miliseconds 
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();  
}

function isCollide(snake){
    // If you bump into your-self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true
    }
        
}

// gameEngine function help to statr our game 
function gameEngine(){
    // Part 1: Updating snake array and Food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert(" Game Over : Press Any Key to Paly Again");
        snakeArr = [{x: 13 , y: 15}];
        // musicSound.play(); 
        score = 0;
    }

    // If you eaten the food , increment the score and regenrate food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highest Score : " + hiscoreval
        }
        scoreBox.innerHTML = "Your Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    // Moving the Snake
    // This loop working in opposite direction and we start loop from second last item to first item and transfer last item to place of second last {...snakeArr[i]} we write it as only beacause for the protection futher problems  
    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    

    // Part 2: Display snake and Food
    // Display Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}






// Main Logic Starts Here

// We use requestAnimationFrame because  it is good to make game loop instead of setInterval function
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score : " + hiscore
}
window.requestAnimationFrame(main); 
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1; 
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
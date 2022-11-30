// index.html tags as javascript variables

const body = document.getElementsByTagName("body")[0];
const htmlTag = document.getElementsByTagName("html")[0];

const gameBackground = document.getElementsByClassName("game-background")[0];
gameBackground.innerHTML += '<p></p>';

const gameBackgroundText = document.querySelector(".game-background p");
const character = document.getElementsByClassName("character")[0];
const containerCharacter = document.getElementsByClassName("container-character")[0];

const VELOCITY = 10;

// taking screen boundaries for the collision
const SCREEN_WIDTH = screen.width - 80;
const SCREEN_HEIGHT = screen.height - 170;

// person position
let xPosition = 500;
let yPosition = 300;

const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"];

// returns text for user if true
let collisionAlert = false;

window.addEventListener("keydown", (event) => {
    const key  = event.key;

    const keyPressedAvaiable =  keysAvaiable.some((currentKey) => {
        return currentKey === key;
    })

    if(!keyPressedAvaiable) return;

    directions.forEach((direction) => {
        if(character.classList.contains(direction)) character.classList.remove(direction);
    })
    
    // user within screen boundaries (0 and SCREEN_WIDTH, 0 and SCREEN_HEIGHT)
    if (((0 <= xPosition) && (xPosition <= SCREEN_WIDTH)) && ((0 <= yPosition) && (yPosition <= SCREEN_HEIGHT))) {

        collisionAlert = false;
        gameBackgroundText.innerText = '';
    
        if(key === "ArrowUp"){
            character.classList.add("turnUp");
            yPosition -= VELOCITY;
        }
    
        if(key === "ArrowDown"){
            character.classList.add("turnDown");
            yPosition += VELOCITY;
        }
    
        if(key === "ArrowLeft"){
            character.classList.add("turnLeft");
            xPosition -= VELOCITY;
        }
    
        if(key === "ArrowRight"){
            character.classList.add("turnRight");
            xPosition += VELOCITY;
        }
    
        containerCharacter.style.top = `${yPosition}px`;
        containerCharacter.style.left = `${xPosition}px`
        
    // user out of bounds    
    } else {

        // user alert
        if (!collisionAlert) {
            gameBackgroundText.innerText = 'Batida! Mude a direção pra continuar caminhando!';
            collisionAlert = true;
        }
        
        // collision logic
        if (xPosition < 0) {
            xPosition = 0;
        }

        if (xPosition > SCREEN_WIDTH) {
            xPosition = SCREEN_WIDTH;
        }

        if (yPosition < 0) {
            yPosition = 0;
        }

        if (yPosition > SCREEN_HEIGHT) {
            yPosition = SCREEN_HEIGHT;
        }
    }
});

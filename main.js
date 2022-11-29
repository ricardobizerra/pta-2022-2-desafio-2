const body = document.getElementsByTagName("body")[0];
const htmlTag = document.getElementsByTagName("html")[0];

const gameBackground = document.getElementsByClassName("game-background")[0];
gameBackground.innerHTML += '<p></p>';

const gameBackgroundText = document.querySelector(".game-background p");
const character = document.getElementsByClassName("character")[0];
const containerCharacter = document.getElementsByClassName("container-character")[0];

const VELOCITY = 10;

const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height;

let xPosition = 500;
let yPosition = 300;

const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"];

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
    
    if (((0 <= xPosition) && (xPosition <= SCREEN_WIDTH - 80)) && ((0 <= yPosition) && (yPosition <= SCREEN_HEIGHT - 170))) {

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
        
    } else {

        if (!collisionAlert) {
            gameBackgroundText.innerText = 'Batida! Mude a direção pra continuar caminhando!';
            collisionAlert = true;
        }
        
        if (xPosition < 0) {
            xPosition = 0;
        }

        if (xPosition > SCREEN_WIDTH - 80) {
            xPosition = SCREEN_WIDTH - 80;
        }

        if (yPosition < 0) {
            yPosition = 0;
        }

        if (yPosition > SCREEN_HEIGHT - 170) {
            yPosition = SCREEN_HEIGHT - 170;
        }
    }

    console.log(xPosition, yPosition)
});

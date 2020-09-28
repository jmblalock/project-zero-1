const ICONS = ["feed", "lightsOut", "play"];
const SCENES = ["day", "night"];

// Displays Name, Age, Hunger, Fatigue and Bordom
const writeModal = function writeModal (text = "") {
    document.querySelector(".modal")  
    .innerHTML = `<div class="modal-inner">${text}</div>`;
};  
const modScene = function modScene (state) {
    document.querySelector(".game").className = `game ${state}`;
};

class Tomagatchi {
    constructor (name) {
        this.current = "INIT";
        this.name = "";
        this.clock = 0,
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
    }
    tick() {

    }
    startgame() {

    }
    handleUserAction(icon){

    }
    play() {
        this.bordom--;
    }
    lightsOut() {
        this.fatigue--;
    }
    feed() {
        modScene("day");
        this.hunger--;
    }
    evolve() {
        modScene("day");
        writeModal(`${this.name} evolved!`);
    }
    die() {
        this.current = "DEAD";
        this.resetCounters();
        writeModal(`${this.name} died. <br/> Press the middle button to start`);
    }
    resetCounters() {
        this.clock = 0;
        this.hunger = 0;
        this.fatigue = 0;
        this.bordom = 0;
        this.age = 0;
    }

};

gameState = new Tomagatchi();
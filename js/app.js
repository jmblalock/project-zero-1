const ICONS = ["feed", "lightsOut", "play"];
const SCENES = ["day", "night"];
const TICK_RATE = 3000;

// Displays Name, Age, Hunger, Fatigue and Bordom
const writeModal = function writeModal (text = "") {
    document.querySelector(".modal")  
    .innerHTML = `<div class="modal-inner">${text}</div>`;
};
// Changes day/night
const modScene = function modScene (state) {
    document.querySelector(".game").className = `game ${state}`;
};
// Change Dog
const modDog = function modDog (state) {
    document.querySelector(".dog").className = `dog dog-${state}`;
};
const toggleHighlighted = (icon, show) =>
    document.querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", show);

        function initButtons(handleUserAction) {
            let selectedIcon = 0;
            function buttonClick({ target }) {
                if (target.classList.contains("right-btn")) {
                    toggleHighlighted(selectedIcon, false);
                    selectedIcon = (2 + selectedIcon) % ICONS.length;
                    toggleHighlighted(selectedIcon, true);
                } else if (target.classList.contains("left-btn")) {
                    toggleHighlighted(selectedIcon, false);
                    selectedIcon = (1 + selectedIcon) % ICONS.length;
                    toggleHighlighted(selectedIcon, true);
                } else {
                    handleUserAction(ICONS[selectedIcon]);
                    toggleHighlighted(selectedIcon, true);
                }
            } 
            document.querySelector(".buttons").addEventListener("click", buttonClick);
        }

const gameState = {
    current: "INIT",
    name: "",
    clock: 0,
    hunger: 0,
    fatigue: 0,
    bordom: 0,
    age: 0,
    tick() {
        this.clock++;
        console.log(this.clock);

        if (this.clock % 5 === 0 && this.current === 'ALIVE') {
            this.bordom++;
            writeModal(`Name: ${this.name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
        } else if (this.clock % 7 === 0 && this.current === 'ALIVE') {
            this.hunger++;
            writeModal(`Name: ${this.name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
        } else if (this.clock % 9 === 0 && this.current === 'ALIVE') {
            this.fatigue++;
            writeModal(`Name: ${this.name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
        } else if (this.clock % 11 === 0 && this.current === 'ALIVE') {
            this.age++;
            writeModal(`Name: ${this.name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
        } else if (this.hunger >= 10 || this.fatigue >= 10 || this.bordom >= 10) {
            this.die();
        } else if (this.age >= 3) {
            this.evolve();
        }

        return this.clock;
        },
    startGame() {
        this.name = prompt("What is it's name?");
        writeModal(`Name: ${name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
        this.current = "ALIVE";
        modDog("egg");
        },
    handleUserAction(icon) { 
        if (this.current === "INIT" || this.current === "DEAD") {
            this.startGame();
            return;
        }
        switch (icon) {
            case "play":
                this.play();
                break;
            case "lightsOut":
                this.lightsOut();
                break;
            case "feed":
                this.feed();
                break;
        }
    },
    play() {
        this.bordom--;
        modDog('playing');
        modScene('day');
        writeModal(`Name: ${name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
    },
    lightsOut() {
        this.fatigue--;
        modScene("night");
        modDog("sleep");
        writeModal(`Name: ${name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
    },
    feed() {
        this.hunger--;
        modScene("day");
        modDog("eating");
        writeModal(`Name: ${name}  Age: ${this.age}  Hunger: ${this.hunger}/10  
                        Fatigue: ${this.fatigue}/10  Bordom: ${this.bordom}/10`);
    },
    evolve() {
        modScene("day");
        modDog("evolving");
        console.log(`${this.name} evolved!`);
    },
    die() {
        this.current = "DEAD";
        modScene("dead");
        modDog("dead");
        this.resetCounters();
        writeModal(`${this.name} died. <br/> Press the middle button to start`);
    },
    resetCounters() {
        this.clock = 0;
        this.hunger = 0;
        this.fatigue = 0;
        this.bordom = 0;
        this.age = 0;
    }
};

const handleUserAction = gameState.handleUserAction.bind(gameState);

/***************************************************************************************
*    Title: Complete Front-End Project: Build a Game
*    Author: Brian Holt
*    Date: Jun 22 2020
*    Code version: educational project - latest version
*    Availability: https://frontendmasters.com/courses/front-end-game/the-project/
***************************************************************************************/

async function init() {
    initButtons(handleUserAction);
    console.log("starting game");

    let nextTimeToTick = Date.now();
    function nextAnimationFrame() {
        const now = Date.now();
        if (nextTimeToTick <= now) {
            gameState.tick();
            nextTimeToTick = now + TICK_RATE;
        }
        requestAnimationFrame(nextAnimationFrame);
        }
    nextAnimationFrame();
}

init();
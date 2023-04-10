// ########
// Consts
// ########
const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

const initialAttributes = [
    ['strength', 0],
    ['dexterity', 0],
    ['constitution', 0],
    ['intelligence', 0],
    ['wisdom', 0],
    ['charisma', 0]
];

// ########
// Utils
// In a real world project I would write more readable functions, 
// but here I wanna test how long in can work with a one liner
// ########

// https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
const shuffleArray = array => Array.from(array).sort(() => 0.5 - Math.random());

const roleDice = (times, sides) => Array(times).fill(0).map(() => Math.floor(Math.random() * sides + 1));

const sumArray = array => Array.from(array).reduce((sum, x) => sum + x);

class Player {
    constructor(characterName = 'Naruto') {
        this.name = characterName;
        const shuffledAttributeScores = shuffleArray(defaultAttributeScores);
        const randomAttributes = initialAttributes.map(attribute => {
            attribute[1] = shuffledAttributeScores.pop();
            return attribute;
        });
        this.attributes = new Map(randomAttributes);
    }

    rollAttributes() {
        for (const [key, _] of this.attributes) {
            // isn't working as shift resturns the element and not the left over array
            // const result = roleDice(4, 6)
            //     .sort((a, b) => a - b)
            //     .shift()
            //     .reduce((sum, x) => sum + x);
            const results = roleDice(4, 6)
            results.sort(function (a, b) { return a - b }); // numeric sort w/ compare function
            results.shift(); // remove lowest die roll
            let sum = sumArray(results); // sum the rolls
            this.attributes.set(key, sum);
        }
    }

    printPlayer() {
        console.log(`NAME: ${this.name}`);
        for (const [key, value] of this.attributes) {
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();

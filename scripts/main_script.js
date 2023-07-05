import {Ore} from "./Ore.js";

const hpBar = document.getElementById("hp_bar");

const oreArray = [
    {
        "name" : "stone",
        "rarity" : "common",
        "imgSrc" : "../img/stone.png",
        "lootSrc" : "../img/stoneLoot.png",
        "hp" : 10
    },
    {
        "name" : "diamond",
        "rarity" : "epic",
        "imgSrc" : "../img/stoneDi.png",
        "lootSrc" : "../img/diamond.png",
        "hp" : 50
    }
];

let damage = 1;
const inventorySlots = document.getElementById("inventory").children;
const inventory = [];

//setting canvas
const oresCanvas = document.getElementById("ores");
const ores = oresCanvas.getContext("2d");

//creating first ore and loading it
let ore = new Ore("stone", "common", "../img/stone.png", "../img/stoneLoot.png");
ore.showOre(ores, oresCanvas);
updateHp();

//creating event listener to click on the ore and dealing damage to the ore
oresCanvas.addEventListener("mousedown", () => {
    ore.hit(damage);
    updateHp();
    //getting loot
    if(ore.getHp < 1 && inventory.length < inventorySlots.length) {
        //checking slots avalabile
        let slot;
        for(let i = 0; i < inventorySlots.length; i++) {
            if(inventory[i] === ore.getName) {
                slot = inventorySlots.item(i);
                var numberLoot = parseInt(slot.firstChild.textContent) + 1;
                slot.firstChild.textContent = numberLoot.toString();
                break;
            }
            if(inventorySlots.item(i).querySelector("img") === null) {
                slot = inventorySlots.item(i);
                //putting the loot type into the inventory array
                inventory.push(ore.getName);
                //show image of loot in slot
                slot.innerHTML = '<span class="nrSlot">1</span>';
                ore.showLoot(slot);
                break;
            }
        }
        //generate new ore
        ore = generateOre();
        ore.showOre(ores, oresCanvas);
        updateHp();
    }
})

//function for generating ore
function generateOre() {
    let randomOre = oreArray[Math.random() * oreArray.length>>0];
    return new Ore(randomOre.name, randomOre.rarity, randomOre.imgSrc, randomOre.lootSrc, randomOre.hp);
}

//function for updating hpBar
function updateHp() {
    let greenPercentage = ore.getHp / ore.getMaxHp;
    let green = `${parseFloat(greenPercentage * 100).toFixed(2)}%`;
    hpBar.innerHTML = ore.getHp;
    hpBar.style.background = "linear-gradient(to right, rgb(100, 220, 40) 0%, rgb(100, 220, 40) " + green +",red " + green +", red 100%)";
}
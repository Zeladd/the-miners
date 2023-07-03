export class Ore {
    #name;
    #rarity;
    #maxHp
    #hp;
    #img = new Image(270, 270);
    #loot = new Image(150, 150);
    constructor(name, rarity, imgSrc, lootSrc, hp = 10) {
        this.#name = name;
        this.#rarity = rarity;
        this.#img.src = imgSrc;
        this.#loot.src = lootSrc;
        this.#hp = hp;
        this.#maxHp = hp;
    }

    get getName() {
        return this.#name;
    }

    get getRarity() {
        return this.#rarity;
    }

    get getImg() {
        return this.#img;
    }

    get getHp() {
        return this.#hp;
    }

    get getImgSrc() {
        return this.#img.src;
    }

    get getLootSrc() {
        return this.#loot.src;
    }

    get getMaxHp() {
        return this.#maxHp;
    }

    set setHp(newHp) {
        this.#hp = newHp;
    }
    
    hit(damageDealt) {
        this.#hp -= damageDealt;
    }

    //loading image of the ore when ready
    showOre(canvas2D, canvas) {
        canvas2D.clearRect(0, 0, canvas.width, canvas.height)
        this.#img.onload = () => {
            canvas2D.drawImage(this.#img, 0, 0);
        }
    }

    showLoot(slot) {
        slot.appendChild(this.#loot);
    }
}
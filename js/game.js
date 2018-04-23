import {Furry} from "./furry";
import {Coin} from "./coin";


export class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        self = this;
    }
    index(x, y) {
        return x + (y * 10);
    }
    showFurry() {
        self.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }
    hideVisibleFurry() {
        let furryClass = document.querySelector('.furry');
        if (furryClass !== null) {
            furryClass.classList.remove('furry');
        }
    }
    showCoin() {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }
    moveFurry() {
        if(self.furry.direction === "right") {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === "left") {
            self.furry.x = self.furry.x - 1;
        } else if (self.furry.direction === "up") {
            self.furry.y = self.furry.y - 1;
        } else {
            self.furry.y = self.furry.y + 1;
        }
        if (!self.gameOver()) {
            self.showFurry();
            self.checkCoinCollision();
        }

    }
    turnFurry(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
        }
    }
    checkCoinCollision() {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score = this.score + 1;
            document.querySelector('#score div strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    gameOver() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert('Game over');
            return true;
        } else {
            return false;
        }
    }
    startGame() {
        this.idSetInterval = setInterval(this.moveFurry, 250);
    }
};


import {Game} from "./game";




const game = new Game();
console.log(Math.floor(Math.random() * 10));
game.showCoin();
game.showFurry();

game.startGame();


document.addEventListener('keydown', function(event){
    game.turnFurry(event);
})

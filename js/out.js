/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var game = new _game.Game();
console.log(Math.floor(Math.random() * 10));
game.showCoin();
game.showFurry();

game.startGame();

document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _furry = __webpack_require__(2);

var _coin = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.board = document.querySelectorAll('#board div');
        this.furry = new _furry.Furry();
        this.coin = new _coin.Coin();
        this.score = 0;
        self = this;
    }

    _createClass(Game, [{
        key: "index",
        value: function index(x, y) {
            return x + y * 10;
        }
    }, {
        key: "showFurry",
        value: function showFurry() {
            self.hideVisibleFurry();
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }
    }, {
        key: "hideVisibleFurry",
        value: function hideVisibleFurry() {
            var furryClass = document.querySelector('.furry');
            if (furryClass !== null) {
                furryClass.classList.remove('furry');
            }
        }
    }, {
        key: "showCoin",
        value: function showCoin() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }
    }, {
        key: "moveFurry",
        value: function moveFurry() {
            if (self.furry.direction === "right") {
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
            //tutaj sprawdzamy, czy gameOver zwrocilo true, tzn czy wyszedl poza plansze
            //jesli wyszedl to koniec, nie robimy nic (alert game over)
            //jesli nie wyszedl, czyli nie gameOver, to ma pokazac nowego furry i sprawdzic
            //kolizje z moneta
        }
    }, {
        key: "turnFurry",
        value: function turnFurry(event) {
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
    }, {
        key: "checkCoinCollision",
        value: function checkCoinCollision() {
            if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.score = this.score + 1;
                document.querySelector('#score div strong').innerText = this.score;
                this.coin = new _coin.Coin();
                this.showCoin();
            }
        }
    }, {
        key: "gameOver",
        value: function gameOver() {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
                alert('Game over');
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "startGame",
        value: function startGame() {
            this.idSetInterval = setInterval(this.moveFurry, 250);
        }
    }]);

    return Game;
}();

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Furry = exports.Furry = function Furry() {
    _classCallCheck(this, Furry);

    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coin = exports.Coin = function Coin() {
    _classCallCheck(this, Coin);

    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

/***/ })
/******/ ]);
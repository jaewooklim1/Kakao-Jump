/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports) {
      //canvas setting

      let width = 500;
      let height = 700;

      let canvas = document.getElementById("myCanvas");
      let ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      //background

      function clear() {
        let image = new Image();
        // image.src = './assets/images/background.jpg';
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.drawImage(image, 0, 0, width, height);
        ctx.closePath();
        ctx.fill();
      }

      class Kakao {
        constructor() {
          this.x = 0;
          this.y = 0;
          this.width = 70;
          this.height = 70;
          this.isJumping = false;
          this.isFalling = false;
          this.jumpVelocity = 0;
          this.fallVelocity = 0;
          this.image = new Image();
          this.image.src = "./assets/images/Kakaoguyfixed.png";
        }

        setPosition(newX, newY) {
          this.x = newX;
          this.y = newY;
        }

        draw() {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        jump() {
          if (this.isFalling === false && this.isJumping === false) {
            this.isJumping = true;
            this.jumpVelocity = 20;
            this.fallVelocity = 0;
          }
        }

        checkJump() {
          if (this.y > height / 2) {
            this.setPosition(this.x, this.y - this.jumpVelocity);
          } else {
            if (this.jumpVelocity > 10) {
              points++;
              if (points > highScore) {
                highScore = points;
              }
            }
            platform.platforms.map((p, idx) => {
              p.y += this.jumpVelocity;
              if (p.y > height) {
                let type = Math.floor(Math.random() * 10);
                platform.platforms[idx] = new Platform(
                  Math.random() * (width - p.width),
                  p.y - height,
                  type
                );
              }
            });
          }
          this.jumpVelocity -= 1;
          if (this.jumpVelocity === 0) {
            this.isJumping = false;
            this.isFalling = true;
            this.fallVelocity = 1;
          }
        }

        checkFall() {
          if (this.y + this.height < height) {
            this.setPosition(this.x, this.y + this.fallVelocity);
            this.fallVelocity++;
          } else {
            this.stopFall();
          }
        }

        stopFall() {
          this.isFalling = false;
          this.isJumping = false;
          this.fallVelocity = 0;
          this.jump();
        }

        left() {
          if (this.x > 0) {
            this.x -= 5;
            this.setPosition(this.x, this.y);
          } else {
            this.x = width - this.width;
            this.setPosition(this.x, this.y);
          }
        }

        right() {
          if (this.x + this.width < width) {
            this.x += 5;
            this.setPosition(this.x, this.y);
          } else {
            this.x = width - this.x - this.width;
            this.setPosition(this.x, this.y);
          }
        }

        reset() {
          this.isJumping = false;
          this.isFalling = false;
          this.jumpVelocity = 0;
          this.fallVelocity = 0;
        }
      }

      //platform
      class Platform {
        constructor(x, y, type) {
          this.x = x;
          this.y = y;
          this.type = type;
          this.numPlatforms = 7;
          this.platforms = [];
          this.width = 80;
          this.height = 20;
          this.isMoving = Math.floor(Math.random() * 2);
          this.direction = Math.floor(Math.random() * 2) ? -1 : 1;
        }

        createPlatforms() {
          let y = 0;
          for (let i = 0; i < this.numPlatforms; i++) {
            let type = Math.floor(Math.random() * 10);
            if (y < height - this.height) {
              y += height / this.numPlatforms;
            }
            this.platforms.push(
              new Platform(Math.random() * (width - this.width), y, type)
            );
          }
        }

        draw() {
          ctx.beginPath();
          let gradient = ctx.createRadialGradient(
            this.x + this.width / 2,
            this.y + this.height / 2,
            20,
            this.x + this.width / 2,
            this.y + this.height / 2,
            45
          );
          if (this.type === 1) {
            gradient.addColorStop(0, "#69656b");
            gradient.addColorStop(1, "#69656b");
          } else {
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(1, "#000000");
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.fill();
        }

        checkCollision() {
          this.platforms.map((p, idx) => {
            if (
              kakao.isFalling &&
              kakao.x < p.x + this.width &&
              kakao.x + kakao.width > p.x &&
              kakao.y + kakao.height > p.y &&
              kakao.y + kakao.height < p.y + this.height
            ) {
              p.onCollide();
            }
          });
        }

        onCollide() {
          kakao.stopFall();
          if (this.type === 1) {
            kakao.jumpVelocity = 40;
            this.points += 20;
            if (this.points > this.highScore) {
              this.highScore = this.points;
            }
          }
        }
      }

      //game
      let backgroundMusic = new Audio("./assets/audios/background.mp3");
      backgroundMusic.addEventListener(
        "ended",
        () => {
          this.play();
        },
        false
      );

      let points = 0;
      let highScore = 0;

      // let cloud = new Cloud();
      // cloud.createClouds();

      let platform = new Platform();
      platform.createPlatforms();

      let kakao = new Kakao();
      kakao.setPosition((width - kakao.width) / 2, (height - kakao.height) / 2);
      kakao.jump();

      window.addEventListener("keydown", checkKeyPressed, false);
      window.addEventListener("keyup", checkKeyLifted, false);

      let keyLeft = false,
        keyRight = false;
      function checkKeyPressed(e) {
        if (e.keyCode === 37) {
          keyLeft = true;
        } else if (e.keyCode === 39) {
          keyRight = true;
        } else if (e.keyCode === 13) {
          // backgroundMusic.play();
          kakao.reset();
          points = 0;
          // highScore = 0;
          kakao.setPosition(
            Math.floor((width - kakao.width) / 2),
            (height - kakao.height) / 2
          );
          kakao.jump();
          gameLoop();
        } else if (e.keyCode === 83) {
          if (backgroundMusic.paused) {
            backgroundMusic.play();
          } else {
            backgroundMusic.pause();
          }
        }
      }

      function checkKeyLifted(e) {
        keyLeft = false;
        keyRight = false;
      }

      let gLoop;
      let cover = new Image();

      cover.onload = function () {
        ctx.drawImage(cover, -90, 0, width + 200, height + 100);
      };
      cover.src = "./assets/images/Desktop2.png";
      // gameLoop();
      backgroundMusic.play();

      function gameLoop() {
        // backgroundMusic.play();
        if (keyLeft) {
          kakao.left();
          kakao.image.src = "./assets/images/Kakaoguyfixed.png";
        } else if (keyRight) {
          kakao.right();
          kakao.image.src = "./assets/images/Kakaoguyfixed.png";
        }

        clear();

        // cloud.clouds.map((c, idx) => {
        //   c.draw();
        // });
        // cloud.updateClouds(1, 1.5);

        platform.platforms.map((p, idx) => {
          if (p.isMoving) {
            if (p.x < 0) {
              p.direction = 1;
            } else if (p.x > width - p.width) {
              p.direction = -1;
            }
            p.x += p.direction * (idx / 2) * Math.floor(points / 80);
          }
          p.draw();
        });
        ctx.fillStyle = "Black";
        ctx.font = "12pt Helvetica";
        ctx.fillText("High Score:" + highScore, width - 120, 40);
        ctx.fillText("Points:" + points, width - 100, 20);

        platform.checkCollision();

        kakao.draw();

        if (kakao.isJumping) {
          kakao.checkJump();
        } else if (kakao.isFalling) {
          kakao.checkFall();
        }

        if (kakao.y <= height - kakao.height) {
          // debugger
          gLoop = requestAnimationFrame(gameLoop);
        } else {
          gameOver();
        }
      }

      function gameOver() {
        setTimeout(() => {
          clear();
          let image = new Image();
          // image.src = "./assets/images/cloud.jpg";
          image.onload = function () {
            ctx.drawImage(image, 0, 0, width, height);
          };
          ctx.fillStyle = "Black";
          ctx.font = "15pt Comic Sans MS";
          ctx.fillText("GAME OVER", width / 2 - 60, 210);
          ctx.fillText("Your Score is: " + points, width / 2 - 80, 240);
          ctx.fillText("The high score is: " + highScore, width / 2 - 100, 270);
          ctx.fillText("Press 'ENTER' to Play Again!", width / 2 - 130, 300);
        }, 1000);
        gameover.play();
        setTimeout(() => {
          gameover.pause();
          gameover.load();
        }, 800);
      }

      gameover.addEventListener(
        "ended",
        function () {
          this.play();
        },
        false
      );

      /***/
    },
    /******/
  ]
);
//# sourceMappingURL=bundle.js.map

console.clear();
var canvas = document.querySelector("#bgCanvas");
var context = canvas.getContext("2d");

let mouseX, mouseY;

canvas.height = innerHeight;
canvas.width = innerWidth;

addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  init();
});

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * velocity,
      y: (Math.random() - 0.5) * velocity,
    };
    var mouseRange = 120;

    this.draw = function () {
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.shadowColor = this.color;
      context.shadowBlur = 5;
      context.fill();
      context.closePath();
      context.restore();
    };

    this.update = function () {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      var defaultColor = color;
      const xDist = mouseX - this.x;
      const yDist = mouseY - this.y;

      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x;
      } else if (
        this.y + this.radius > innerHeight ||
        this.y - this.radius < 0
      ) {
        this.velocity.y = -this.velocity.y;
      }

      if (
        xDist < mouseRange &&
        xDist > -mouseRange &&
        yDist < mouseRange &&
        yDist > -mouseRange
      ) {
        this.color = "#fff";
        this.x += 4 * this.velocity.x;
        this.y += 4 * this.velocity.y;
      } else {
        this.color = defaultColor;
      }
      this.draw();
    };
  }
}

var particlesArray = [];
// var colorsArray = ["#3498db", "#1abc9c1", "#e74c3c", "#9b59b6"];
var colorsArray = ["#bfd4f2", "#fdffff", "#077dbe", "#d0eef3"];

function init() {
  console.log("init");
  const pointNumber = 100;
  particlesArray = new Array(pointNumber).fill(null).map(() => {
    const randRadius = Math.random() * 4;
    const randX = Math.random() * innerWidth - 2 * randRadius + randRadius;
    const randY = Math.random() * innerHeight - 2 * randRadius + randRadius;
    const randVelocity = Math.random() * 6;
    var randColorIndex = Math.floor(Math.random() * colorsArray.length);
    return new Particle(
      randX,
      randY,
      randRadius,
      colorsArray[randColorIndex],
      randVelocity
    );
  });
}

function animate() {
  context.clearRect(0, 0, innerWidth, innerHeight);
  particlesArray.forEach((particle) => {
    particle.update();
    console.log("update");
  });
  setTimeout(animate, 100);
}

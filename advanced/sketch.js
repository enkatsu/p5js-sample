/***
ボールのデータ構造
{
  position: {x: number, y: number}
  speed: {x: number, y: number},
  radius: number,
  color: {h: number, s: number, v: number}
}
*/

const balls = [];
const BALL_NUM = 30;
let isMove = true;

function setup() {
  const canvas = createCanvas(windowWidth, 480);
  canvas.parent('sketch-container');
  smooth();
  colorMode(HSB, 360, 100, 100, 100);

  // ボタンやチェックボックスを操作した際の挙動を設定
  const changeColorButton = document.getElementById('change-color-button');
  changeColorButton.addEventListener('click', changeColor);
  const isMoveButton = document.getElementById('is-move-checkbox');
  isMoveButton.addEventListener('change', switchMove);

  // ボールを初期化
  for (let i = 0; i < BALL_NUM; i++) {
    const radius = random(10, 30);
    const position = {
      x: random(radius, width - radius),
      y: random(radius, height - radius)
    };
    const speed = {
      x: random(-2, 2),
      y: random(-2, 2)
    };
    const color = {h: random(360), s: 100, v: 100};
    balls.push({
      position: position,
      radius: radius,
      color: color,
      speed: speed
    });
  }
}

function draw() {
  background(0, 0, 90);

  for (let i = 0; i < balls.length; i++) {
    const position = balls[i].position;
    const speed = balls[i].speed;
    const radius = balls[i].radius;
    const color = balls[i].color;

    // ボールを描画
    noStroke();
    fill(color.h, color.s, color.v, 80);
    ellipse(position.x, position.y, radius * 2);

    // ボールを動かす
    if(isMove) {
      position.x += speed.x;
      position.y += speed.y;

      // 跳ね返り
      if (radius > position.x || position.x > width - radius) {
        speed.x *= -1;
      }
      if (radius > position.y || position.y > height - radius) {
        speed.y *= -1;
      }
      position.x = constrain(position.x, radius, width - radius);
      position.y = constrain(position.y, radius, height - radius);
    }
  }
}

/***
 チェックボックスの状態によって、ボールを動かすか否かを更新する
 */
function switchMove() {
  isMove = this.checked;
}

/***
 全てのボールの色を更新
 */
function changeColor() {
  for (let i = 0; i < balls.length; i++) {
    const color = {h: random(360), s: 100, v: 100};
    balls[i].color = color;
  }
}

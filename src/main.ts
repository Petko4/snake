import { Application, Graphics } from "pixi.js";

enum direction {
  RIGHT,
  LEFT,
  UP,
  DOWN,
}

const main = async () => {
  const app = new Application();
  globalThis.__PIXI_APP__ = app;
  await app.init({
    width: 600,
    height: 600,
  });

  document.body.appendChild(app.canvas);

  const snake: Graphics[] = [];
  const segmentSize = 25;

  for (let i = 0; i < 3; i++) {
    // let square = new Graphics().rect(300 - i * 25, 300, 25, 25).fill(0xde3249);
    let square = new Graphics();
    square.beginFill(0xde3249);
    square.drawRect(0, 0, segmentSize, segmentSize);
    square.endFill();
    square.x = 300 - i * segmentSize;
    square.y = 300;

    app.stage.addChild(square);
    snake.push(square);
  }

  // for (let i = 0; i < 5; i++) {
  //   let circle = new Graphics().circle(100 + i * 100, 100, 50).fill("red");
  //   app.stage.addChild(circle);
  // }

  let currentDirection = direction.RIGHT;

  let speed = 25;
  let elapsed = 0.0;
  let updateTick = 0.0;

  window.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowRight":
        currentDirection = direction.RIGHT;
        break;
      case "ArrowLeft":
        currentDirection = direction.LEFT;
        break;
      case "ArrowUp":
        currentDirection = direction.UP;
        break;
      case "ArrowDown":
        currentDirection = direction.DOWN;
        break;
    }
  });

  app.ticker.add((ticker) => {
    const headX = snake[0].x;
    const headY = snake[0].y;

    elapsed += ticker.deltaTime;

    if (updateTick > 1000) {
      switch (currentDirection) {
        case direction.RIGHT:
          snake[0].x += speed;
          break;
        case direction.LEFT:
          snake[0].x -= speed;
          break;
        case direction.DOWN:
          snake[0].y += speed;
          break;
        case direction.UP:
          snake[0].y -= speed;
          break;
      }

      // console.log(ticker.deltaMS);
      for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
      }
      updateTick = 0.0;
    }
    updateTick += ticker.deltaMS;
    console.log(updateTick);
  });
};

main();

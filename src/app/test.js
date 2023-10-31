import { useEffect } from "react";

let coinsCount = 0;

const addCoin = (x, y) => {
  const screen = document.getElementById("screen");
  const coinBox = document.createElement("div");
  coinBox.id = `coinBox${coinsCount}`;
  coinBox.className =
    "absolute transition-all duration-[100ms] ease-linear select-none";
  coinBox.style.transform = `translate(${x}px, ${y}px)`;
  const coin = document.createElement("img");
  coin.id = `coin${coinsCount}`;
  coin.src = "casino_coin_1.svg";
  coin.className = "transition-all duration-[1000ms] ease-linear select-none";
  coinBox.appendChild(coin);
  screen.appendChild(coinBox);
  coinsCount++;
};

const CURVE = [
  { x: -10, y: -10 },
  { x: -7, y: -7 },
  { x: -5, y: -5 },
  { x: -2, y: -2 },
  { x: -1, y: -1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 5, y: 5 },
  { x: 7, y: 7 },
  { x: 10, y: 10 },
];

const placeCoin = (n, x, y, startX, startY) => {
  const coin = document.getElementById(`coin${n}`);
  const coinBox = document.getElementById(`coinBox${n}`);
  const destinationX = x - 40;
  const destinationY = y - 40;
  const distanceX = destinationX - startX;
  const distanceY = destinationY - startY;
  let pointX = startX;
  let pointY = startY;
  const stepX = distanceX / CURVE.length;
  const stepY = distanceY / CURVE.length;
  coin.style.transform = `scale(0.4) rotateX(360deg)`;

  const move = (i = 0) => {
    if (i === CURVE.length) return;
    pointX += stepX + CURVE[i].x * (stepX < 0 ? -1 : 1);
    pointY += stepY + CURVE[i].y;
    coinBox.style.transform = `translate(${pointX}px, ${pointY}px)`;
    setTimeout(() => move(i + 1), 100);
  };

  move();
};

export const Test2 = ({}) => {
  useEffect(() => {
    const startX = window.innerWidth / 2 - 40;
    const startY = window.innerHeight - 120;
    addCoin(startX, startY);

    window.addEventListener("click", async (e) => {
      if (e.target.id === "reset") return;
      placeCoin(coinsCount - 1, e.clientX, e.clientY, startX, startY);
      addCoin(startX, startY);
    });
  }, []);

  return (
    <div id="screen" className="w-full h-screen">
      <div
        id="reset"
        className="bg-neutral-300 rounded p-2 w-20 text-center text-black absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] select-none"
        onClick={(e) => {
          for (let i = 0; i < coinsCount; i++) {
            const element = document.getElementById(`coinBox${i}`);
            element?.remove();
          }
          coinsCount = 0;
          console.log("coinsCount", coinsCount);
          const startX = window.innerWidth / 2 - 40;
          const startY = window.innerHeight - 120;
          addCoin(startX, startY);
          console.log("coinsCount", coinsCount);
        }}
      >
        Reset
      </div>
      <img
        id="table"
        src="table.png"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none"
      />
    </div>
  );
};

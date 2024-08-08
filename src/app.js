/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let listOriginal = document.querySelector("#list-cards-original");
let inputCards = document.querySelector("input");
let btnDraw = document.querySelector("#btn-draw");
let btnSort = document.querySelector("#btn-sort");
let bubbleList = document.querySelector("#bubble-list");

let symbols = ["♦", "♥", "♠", "♣"];
let numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
let arrCards = [];

let valueNumCard = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

function genRandom(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

function cardGenerator() {
  let symbolCard = genRandom(symbols);
  let numberCard = genRandom(numbers);
  let valueCard = valueNumCard[numberCard]; // Obtener el valor numérico de la carta
  let genCard = `
        <div
          class="card-gen d-flex flex-column gap-4 bg-white rounded-3 fs-5 p-2 fw-bold "
          style="width: 110px; height: 150px;"
          id="id-Card"
        >
          <div class=${(symbolCard === "♥" && "text-danger") ||
            (symbolCard === "♦" && "text-danger")}>
            ${symbolCard}
          </div>
            <div class="mx-auto">${numberCard}</div>
          <div
            class=${(symbolCard === "♥" &&
              "text-danger d-flex justify-content-start align-items-start") ||
              (symbolCard === "♦" &&
                "text-danger d-flex justify-content-start align-items-start")}"
            style="height: 100%; transform: rotate(180deg);"
          >
            ${symbolCard}
          </div>
        </div>
  `;
  arrCards.push([valueCard, genCard]);
  listOriginal.innerHTML += genCard;
}

function inputGen(num, func) {
  let count = 0;
  while (count < num) {
    func();
    count++;
  }
}

function sortCard(arr) {
  let wall = arr.length - 1;

  let auxDiv = document.createElement("div");
  auxDiv.style.marginTop = "10px";
  auxDiv.classList.add("d-flex", "flex-column", "gap-2");

  bubbleList.innerHTML = "";
  bubbleList.appendChild(auxDiv);

  while (wall > 0) {
    let index = 0;

    let stepDiv = document.createElement("div");
    stepDiv.classList.add("d-flex", "gap-2");

    while (index < wall) {
      if (arr[index][0] > arr[index + 1][0]) {
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];

        stepDiv.innerHTML = "";

        arr.forEach(item => {
          stepDiv.innerHTML += item[1];
        });

        auxDiv.appendChild(stepDiv);

        stepDiv = document.createElement("div");
        stepDiv.classList.add("d-flex", "gap-2");
      }
      index++;
    }
    wall--;
  }

  let finalDiv = document.createElement("div");
  finalDiv.classList.add("d-flex", "gap-2");
  arr.forEach(item => {
    finalDiv.innerHTML += item[1];
  });
  auxDiv.appendChild(finalDiv);

  return arr;
}

btnDraw.addEventListener("click", () => {
  let numValue = inputCards.value;
  listOriginal.innerHTML = "";
  arrCards = [];
  inputGen(numValue, cardGenerator);
});

btnSort.addEventListener("click", () => {
  console.log(arrCards);
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("d-flex");
  resultDiv.classList.add("gap-2");

  bubbleList.innerHTML = "";
  bubbleList.appendChild(resultDiv);
  arrCards.forEach(item => {
    resultDiv.innerHTML += item[1];
  });
  sortCard(arrCards);
});

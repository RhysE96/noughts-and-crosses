const tiles = document.querySelectorAll(".tile");
const cross = '<div class="cross"><i class="fa fa-solid fa-x"></i></div>';
const nought = '<div class="nought"><i class="fa fa-solid fa-o"></i></div>';
let tileId = 1;
let gameActive = true;

function newGame() {
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });

  tileId = 1;
  noughtIds = [];
  crossIds = [];
  gameActive = true;

  const hrElements = document.querySelectorAll("hr");

  hrElements.forEach(function (hrElement) {
    hrElement.remove();
  });
}

tiles.forEach((tile) => {
  tile.id = "tile-" + tileId;
  tileId++;

  tile.addEventListener("click", handleClick);
});

let clickCount = 0;
let noughtIds = [];
let crossIds = [];

function handleClick(event) {
  if (!gameActive) return;

  const clickedTile = event.target.closest(".tile");

  if (clickCount % 2 && clickedTile.innerHTML === "") {
    clickedTile.insertAdjacentHTML("beforeend", nought);
    clickedTile.classList.add("tile-nought");
    noughtid = clickedTile.id.replace(/\D/g, "");
    noughtIds.push(noughtid);
  } else if (clickedTile.innerHTML === "") {
    clickedTile.insertAdjacentHTML("beforeend", cross);
    clickedTile.classList.add("tile-cross");
    crossid = clickedTile.id.replace(/\D/g, "");
    crossIds.push(crossid);
  }

  winCheck();

  clickCount++;
}

const winArrays = [
  ["1", "2", "3"],
  ["3", "6", "9"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["3", "5", "7"],
  ["2", "5", "8"],
  ["4", "5", "6"],
];

function winCheck() {
  for (let i = 0; i < winArrays.length; i++) {
    let winOption = winArrays[i];

    //checks if each win option has all of the clicked nought id's in it
    if (winOption.every((number) => noughtIds.includes(number))) {
      youLose();
      linePlacer(winOption);
      gameActive = false;
    } else if (winOption.every((number) => crossIds.includes(number))) {
      youWin();
      linePlacer(winOption);
      gameActive = false;
    }
  }
}

let winCount = 0;
let lossCount = 0;

function youWin() {
  winCount++;
  document.getElementById("win-count").textContent = winCount;
}

function youLose() {
  lossCount++;
  document.getElementById("loss-count").textContent = lossCount;
}

function linePlacer(winIds) {
  for (let i = 0; i < winArrays.length; i++) {
    let winOption = winArrays[i];

    if (winOption.every((number) => winIds.includes(number))) {
      const grid = document.querySelector(".grid");
      grid.insertAdjacentHTML("beforeend", "<hr id='hr-" + i + "'>");
    }
  }
}

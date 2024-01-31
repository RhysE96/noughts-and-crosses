const game = {
  tileId: 1,
  noughtIds: [],
  crossIds: [],
  gameActive: true,
  clickCount: 0,
  winCount: 0,
  lossCount: 0,
};

const tiles = document.querySelectorAll(".tile");
const cross = '<div class="cross"><i class="fa fa-solid fa-x"></i></div>';
const nought = '<div class="nought"><i class="fa fa-solid fa-o"></i></div>';

function newGame() {
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });

  game.tileId = 1;
  game.noughtIds = [];
  game.crossIds = [];
  game.gameActive = true;

  const hrElements = document.querySelectorAll("hr");

  hrElements.forEach(function (hrElement) {
    hrElement.remove();
  });
}

tiles.forEach((tile) => {
  tile.id = "tile-" + game.tileId;
  game.tileId++;

});

document.getElementById('game-grid').addEventListener('click', function(event) {
  const clickedTile = event.target.closest('.tile');
  if (clickedTile) {
    handleClick(event);
  }
});

function handleClick(event) {
  if (!game.gameActive) return;

  const clickedTile = event.target.closest(".tile");

  if (game.clickCount % 2 && clickedTile.innerHTML === "") {
    clickedTile.insertAdjacentHTML("beforeend", nought);
    clickedTile.classList.add("tile-nought");
    const noughtId = clickedTile.id.replace(/\D/g, "");
    game.noughtIds.push(noughtId);

  } else if (clickedTile.innerHTML === "") {
    clickedTile.insertAdjacentHTML("beforeend", cross);
    clickedTile.classList.add("tile-cross");
    const crossId = clickedTile.id.replace(/\D/g, "");
    game.crossIds.push(crossId);
  }

  winCheck();

  game.clickCount++;
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

    if (winOption.every((number) => game.noughtIds.includes(number))) {
      youLose();
      linePlacer(winOption);
      game.gameActive = false;
    } else if (winOption.every((number) => game.crossIds.includes(number))) {
      youWin();
      linePlacer(winOption);
      game.gameActive = false;
    }
  }
}

function youWin() {
  game.winCount++;
  document.getElementById("win-count").textContent = game.winCount;
}

function youLose() {
  game.lossCount++;
  document.getElementById("loss-count").textContent = game.lossCount;
}

function linePlacer(winIds) {
  for (let i = 0; i < winArrays.length; i++) {
    let winOption = winArrays[i];

    if (winOption.every((number) => winIds.includes(number))) {
      const grid = document.getElementById("game-grid");
      grid.insertAdjacentHTML("beforeend", "<hr id='hr-" + i + "'>");
    }
  }
}
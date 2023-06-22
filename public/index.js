document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get("data");

  if (data) {
    const gameData = JSON.parse(decodeURIComponent(data));
    populateScores(gameData);
  }
});

function populateScores(gameData) {
  const tableBody = document.querySelector("tbody");
  const sumRow = document.getElementById("row-sum");

  // Lấy tên người chơi từ dữ liệu API
  const playerNames = [
    gameData[0].round.player1.name,
    gameData[0].round.player2.name,
    gameData[0].round.player3.name,
    gameData[0].round.player4.name,
  ];

  // Thay thế tên người chơi trong các thẻ <th>
  const thElements = document.querySelectorAll("th");
  for (let i = 1; i <= 4; i++) {
    thElements[i].textContent = playerNames[i - 1];
  }

  let sumScores = [0, 0, 0, 0];
  let roundNumber = 1;
  let roundData = gameData[0].round;

  const addButton = document.getElementById("btn-add-round");
  addButton.addEventListener("click", () => {
    roundNumber++;
    const row = document.createElement("tr");
    const roundCell = document.createElement("td");
    const roundNumberSpan = document.createElement("span");
    roundNumberSpan.textContent = roundNumber;
    roundCell.appendChild(document.createTextNode("Round "));
    roundCell.appendChild(roundNumberSpan);
    row.appendChild(roundCell);

    for (let i = 1; i <= 4; i++) {
      const playerScore = roundData[`player${i}`].score;

      const inputCell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.value = playerScore;
      input.classList.add("input-user");
      input.addEventListener("input", (event) => {
        const newScore = parseInt(event.target.value);
        roundData[`player${i}`].score = newScore;
        sumScores[i - 1] = calculateTotalScore(i);
        updateSumRow();
        updateAPI();
      });
      inputCell.appendChild(input);
      row.appendChild(inputCell);

      sumScores[i - 1] += playerScore;
    }

    tableBody.appendChild(row);
    roundData = createNewRound();
    updateSumRow();
    updateAPI();
  });

  updateSumRow();

  function createNewRound() {
    const newRoundData = {
      player1: { name: playerNames[0], score: 0 },
      player2: { name: playerNames[1], score: 0 },
      player3: { name: playerNames[2], score: 0 },
      player4: { name: playerNames[3], score: 0 },
    };
    gameData.push({ idRound: roundNumber, round: newRoundData });
    return newRoundData;
  }

  function calculateTotalScore(playerIndex) {
    let totalScore = 0;
    for (let i = 0; i < roundNumber; i++) {
      totalScore += gameData[i].round[`player${playerIndex}`].score;
    }
    return totalScore;
  }

  function updateSumRow() {
    const sumCells = sumRow.querySelectorAll("th");
    for (let i = 1; i <= 4; i++) {
      sumCells[i].textContent = sumScores[i - 1];
    }

    const sumValueElement = document.getElementById("sum-value");
    const totalSum = sumScores.reduce((acc, score) => acc + score, 0);
    sumValueElement.textContent = totalSum;
  }

  function updateAPI() {
    const updatedData = encodeURIComponent(JSON.stringify(gameData));
    const urlParams = new URLSearchParams();
    urlParams.set("data", updatedData);
    history.replaceState(null, "", "?" + urlParams.toString());
    updateSumRow();
  }
}

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dùng để phục vụ các file tĩnh trong thư mục public (score.html, score.css, index.html, index.css, index.js)
app.use(express.static("public"));

// Tạo route POST '/api/score'
app.post("/api/score", (req, res) => {
  const player1 = {
    name: req.body.player1,
    score: 0,
  };

  const player2 = {
    name: req.body.player2,
    score: 0,
  };

  const player3 = {
    name: req.body.player3,
    score: 0,
  };

  const player4 = {
    name: req.body.player4,
    score: 0,
  };

  const gameData = [
    {
      idRound: 1,
      round: {
        player1,
        player2,
        player3,
        player4,
      },
    },
  ];

  res.json(gameData);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server Express running at http://localhost:${port}`);
});

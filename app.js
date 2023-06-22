const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const userRouter = require("../routes/user.route");

// app.use(bodyParse());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.status(200).send("Hello World");
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello Advance");
});

//api router
// app.use("/api/v1/todos", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server Express running at http://localhost:${port}`);
});

// @ts-check

/* eslint-disable no-console */

const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 5000;

app.use(
  "/",
  (req, res, next) => {
    console.log("Middleware 1_1");
    // 다음 미들웨어로 넘어가게 next() 사용
    const requestedAt = new Date();
    // @ts-ignore
    req.requestedAt = requestedAt;
    setTimeout(() => {
      next();
    }, 1000);
  },
  async (req, res, next) => {
    console.log("Middleware 1_2");
    const fileContent = await fs.promises.readFile("../.gitignore");
    // @ts-ignore
    req.fileContent = fileContent;
    next();
  }
);

app.use((req, res) => {
  console.log("Middleware 2");

  res.send(
    // @ts-ignore
    `Hello, express!: Requested at ${req.requestedAt}, \n ${req.fileContent}`
  );
});

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`);
});

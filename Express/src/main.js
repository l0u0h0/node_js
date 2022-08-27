// @ts-check

/* eslint-disable no-console */

const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 5000;

// app.use(
//   "/",
//   (req, res, next) => {
//     console.log("Middleware 1_1");
//     // 다음 미들웨어로 넘어가게 next() 사용
//     const requestedAt = new Date();
//     // @ts-ignore
//     req.requestedAt = requestedAt;
//     setTimeout(() => {
//       next();
//     }, 1000);
//   },
//   async (req, res, next) => {
//     console.log("Middleware 1_2");
//     const fileContent = await fs.promises.readFile("../.gitignore");
//     // @ts-ignore
//     req.fileContent = fileContent;
//     next();
//   }
// );

// app.use((req, res) => {
//   console.log("Middleware 2");

//   res.send(
//     // @ts-ignore
//     `Hello, express!: Requested at ${req.requestedAt}, \n ${req.fileContent}`
//   );
// });

// 메서드에 따라 라우팅 함수가 다르다.
/** path pattern
 *
 *  /ab?cd => /abcd, /acd
 *  /ab+cd => /abcd, /abbcd, /abbbcd...
 *  /ab*cd => /abcd, /abbbcd, /ab__dfasefagcd,... (* 자리에 아무거나 들어와도 됨. 끝에만 ab, cd)
 *  /a(bc)?d => /abcd, /ad
 *
 * - 정규식 사용 가능
 * - ['/abc', '/xyz'] 같이 배열 사용 가능
 * - 배열에 정규식 사용 가능
 */
app.get(["/abc", "/xyz"], (req, res) => {
  res.send("Root - GET");
});

app.post("/", (req, res) => {
  res.send("Root - POST");
});

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`);
});

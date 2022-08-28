// @ts-check

/* eslint-disable no-console */

// const express = require("express");
// const fs = require("fs");

// const app = express();

// const PORT = 5000;

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

// const express = require("express");
// // const bodyParser = require("body-parser");
// const userRouter = express.Router();

// const app = express();

// // app.use(bodyParser.json());

// app.use(express.json());

// app.set("views", "src/views");
// app.set("view engine", "pug");

// const PORT = 5000;

// // 메서드에 따라 라우팅 함수가 다르다.
// /** path pattern
//  *
//  *  /ab?cd => /abcd, /acd
//  *  /ab+cd => /abcd, /abbcd, /abbbcd...
//  *  /ab*cd => /abcd, /abbbcd, /ab__dfasefagcd,... (* 자리에 아무거나 들어와도 됨. 끝에만 ab, cd)
//  *  /a(bc)?d => /abcd, /ad
//  *
//  * - 정규식 사용 가능
//  * - ['/abc', '/xyz'] 같이 배열 사용 가능
//  * - 배열에 정규식 사용 가능
//  */
// userRouter.get("/", (req, res) => {
//   res.send("User list");
// });

// const USERS = {
//   10: {
//     name: "foo",
//   },
//   11: {
//     name: "bar",
//   },
// };

// userRouter.param("id", (req, res, next, value) => {
//   // @ts-ignore
//   req.user = USERS[value];
//   next();
// });

// userRouter.get("/:id", (req, res) => {
//   const resMimeType = req.accepts(["json", "html"]);

//   if (resMimeType === "json") {
//     // @ts-ignore
//     res.send(req.user);
//   } else if (resMimeType === "html") {
//     res.render("user-profile", {
//       // @ts-ignore
//       name: req.user.name,
//     });
//   }
// });

// userRouter.post("/", (req, res) => {
//   // Register User
//   res.send("User Registerd");
// });

// userRouter.post("/:id/name", (req, res) => {
//   // @ts-ignore
//   const { user } = req;
//   const { name } = req.body;

//   user.name = name;

//   res.send(`User Name updated: ${name}`);
// });

// app.use("/users", userRouter);

// app.use("/public", express.static("src/public"));

// app.listen(PORT, () => {
//   console.log(`The Express server is listening at port: ${PORT}`);
// });

const express = require("express");

const app = express();
app.use(express.json());
app.set("views", "src/views");
app.set("view engine", "pug");

const PORT = 5000;

const userRouter = require("./routers/user");

app.use("/users", userRouter);
app.use("/public", express.static("src/public"));

// error-handling middleware
// @ts-ignore
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`);
});

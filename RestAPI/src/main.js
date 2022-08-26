/**
 * 블로그 포스팅 서비스 - toyproj
 * - 로컬 파일을 데이터 베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용
 */

const http = require("http");
const { resolve } = require("path");

const { routes } = require("./api");

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    if (!req.url || !route) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers["content-type"] === "application/json" &&
        (await new Promise((resolve, reject) => {
          req.setEncoding("utf-8");
          req.on("data", (data) => {
            try {
              resolve(JSON.parse(data));
            } catch {
              reject(new Error("Ill-formed json"));
            }
          });
        }))) ||
      undefined;

    const result = await route.callback(regexResult, reqBody);
    res.statusCode = result.statusCode;
    if (typeof result.body === "string") {
      res.end(result.body);
    } else {
      res.setHeader("Content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify(result.body));
    }
  }

  main();
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server i listening at port: ${PORT}`);
});

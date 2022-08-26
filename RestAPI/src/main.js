/**
 * 블로그 포스팅 서비스 - toyproj
 * - 로컬 파일을 데이터 베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용
 */

const http = require("http");

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

    if (!route) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    const result = await route.callback();
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

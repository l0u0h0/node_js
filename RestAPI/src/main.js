/**
 * 블로그 포스팅 서비스 - toyproj
 * - 로컬 파일을 데이터 베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용
 */

const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end("hello");
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server i listening at port: ${PORT}`);
});

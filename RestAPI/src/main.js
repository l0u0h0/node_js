/**
 * 블로그 포스팅 서비스 - toyproj
 * - 로컬 파일을 데이터 베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용
 */

const http = require("http");
/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log("Requst accepted");
  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200;
    res.end("List of Posts");
    return;
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {
    res.statusCode = 200;
    res.end("Some content of the post");
    return;
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200;
    res.end("Creating post");
    return;
  } else {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }
  res.statusCode = 200;
  res.end("hello");
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server i listening at port: ${PORT}`);
});

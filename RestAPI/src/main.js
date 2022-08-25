/**
 * 블로그 포스팅 서비스 - toyproj
 * - 로컬 파일을 데이터 베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용
 */

const http = require("http");

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: "my_first_post",
    title: "My first post",
    content: "Hello!",
  },
  {
    id: "my_second_post",
    title: "나의 두번째 포스트",
    content: "Second post!",
  },
];

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
  const postIdRegexResult =
    (req.url && POST_ID_REGEX.exec(req.url)) || undefined;
  // console.log(req.url);
  // console.log("Requst accepted");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.url === "/posts" && req.method === "GET") {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    };
    res.statusCode = 200;
    res.end(JSON.stringify(result));
    return;
  } else if (postIdRegexResult && req.method === "GET") {
    // GET /posts/:id
    const postId = postIdRegexResult[1];
    const post = posts.find((_post) => _post.id === postId);

    if (post) {
      res.statusCode = 200;
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end("POST Not Found");
    }
    return;
  } else if (req.url === "/posts" && req.method === "POST") {
    req.setEncoding("utf-8");
    req.on("data", (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */
      /** @type {CreatePostBody} */
      const body = JSON.parse(data);
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, "_"),
        title: body.title,
        content: body.content,
      });
    });
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

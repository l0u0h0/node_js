// @ts-check

const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const USERS = {
  10: {
    name: "foo",
    profileimg: undefined,
  },
  11: {
    name: "bar",
    profileimg: undefined,
  },
};

router.get("/", (req, res) => {
  res.send("User list");
});

router.param("id", async (req, res, next, value) => {
  // 없는 유저에 대한 요청이 왔을 때 에러가 날 수 있음.
  try {
    // @ts-ignore
    const user = USERS[value];

    if (!user) {
      const err = new Error("User Not Found");
      // @ts-ignore
      err.statusCode = 404;
      throw err;
    }

    // @ts-ignore
    req.user = USERS[value];
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res) => {
  const resMimeType = req.accepts(["json", "html"]);

  if (resMimeType === "json") {
    // @ts-ignore
    res.send(req.user);
  } else if (resMimeType === "html") {
    res.render("user-profile", {
      // @ts-ignore
      name: req.user.name,
      userId: req.params.id,
      // @ts-ignore
      profileimgurl: `/uploads/${req.user.profileimg}`,
    });
  }
});

router.post("/", (req, res) => {
  res.send("User Registerd");
});

router.post("/:id/name", (req, res) => {
  // @ts-ignore
  const { user } = req;
  const { name } = req.body;

  user.name = name;

  res.send(`User Name updated: ${name}`);
});

// input name이 upload 미들웨어 싱글 인자로 들어옴.
router.post("/:id/profile", upload.single("profile"), (req, res) => {
  // @ts-ignore
  const { user } = req;

  user.profileimg = req.file?.filename;

  res.send("User Profile image upload");
});

module.exports = router;

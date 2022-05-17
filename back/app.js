const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const dotenv = require("dotenv");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3060", "http://busanbird.com"],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); // 프론트에서 온 json데이터를 req.body에 넣어주는 역활
app.use(express.urlencoded({ extended: true })); // 프론트에서 온 formsubmit 데이터를 req.body에 넣어주는 역활!!

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".busanbird.com",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/hashtag", hashtagRouter);

app.listen(80, () => console.log("서버 실행중!!!"));

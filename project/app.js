const { error } = require("console");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const { Cookie } = require("express-session");
const { connect } = require("http2");
const morgan = require("morgan");
const path = require("path"); // 경로처리

const indexRouter = require("./routes/index");
const mainRouter = require("./routes/main");

const { sequelize } = require("./models/index");
const userTable = require("./models/user");

const app = express();

// 변수 설정(port 변수에 3000 설정)
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "ldkpw",
    cookie: {
      httpOnly: true,
    },
    name: connect.sid,
  })
);
app.use(express.json()); // json 데이터 파싱
app.use(express.urlencoded({ extended: true })); // 폼(form) 데이터 파싱

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// 데이터 삭제(Delete)
userTable
  .destroy({
    where: { id: 4 },
    force: true, // 이 옵션을 사용하면 즉시 삭제 (소프트 삭제가 아님)
  })
  .then(() => {
    console.log("User deleted");
  })
  .catch((err) => {
    console.error("Error deleting user:", err);
  });

// 라우터 분리
app.use("/", indexRouter);
app.use("/main", mainRouter);

// 미들웨어 사용
app.use((req, res, next) => {
  req.session;
  console.log("이 코드는 모든 요청에 실행합니다.");
  next(); // 다음라우터 찾기
});

app.get("/login", (req, res) => {
  res.send("hello login");
});

app.get("/main/ldk", (req, res) => {
  res.send("hello ldk");
});
// 와일드카드 응답은 항상 최하단에 위치해야한다(Node.js는 JS기반이기 때문에 항상 위부터 아래로 코드가 순차적으로 실행함을 유의해야한다.)
app.get("/main/:user", (req, res) => {
  res.send("hello wildcard");
});

// 에러처리
// 에러 미들웨어의 인수는 무조건 4개 모두 입력해야한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러발생!");
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log("서버 실행");
});

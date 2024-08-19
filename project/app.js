const { error } = require("console");
const cookieParser = require("cookie-parser");
const express = require("express");
const { Cookie } = require("express-session");
const morgan = require("morgan");
const path = require("path"); // 경로처리

const app = express();

// 변수 설정(port 변수에 3000 설정)
app.set("port", process.env.PORT || 3000);

app.use(morgan('dev'))
app.use('/img', express.static(path.join(__dirname, 'public')));
app.use(cookieParser('amhozirong'));
app.use(express.json()); // json 데이터 파싱
app.use(express.urlencoded({extended:true})); // 폼(form) 데이터 파싱

// 미들웨어 사용
app.use(
  (req, res, next) => {
    console.log("이 코드는 모든 요청에 실행합니다.");
    next(); // 다음라우터 찾기
  },
);

app.get("/", (req, res, next) => {
  res.cookie('signedCookie', 'signedValue', { maxAge: 900000, httpOnly: true, signed: true });
  next();
  // res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/main", (req, res) => {
  res.send("hello main");
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

// 아스트로(*)는 해당 메서드의 모든 경로에 해당하는 응답을 제공한다(즉, 최하단에 위치해야함)
app.get("*", (req, res) => {
  res.send("hello evrybody");
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

const express = require("express");
const path = require("path"); // 경로처리

const app = express();

// 변수 설정(port 변수에 3000 설정)
app.set("port", process.env.PORT || 3000);

// 미들웨어 사용
app.use("/main", (req, res, next) => {
  console.log("이 코드는 모든 요청에 실행합니다.");
  next(); // 다음라우터 찾기
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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

// 서버 실행
app.listen(app.get("port"), () => {
  console.log("서버 실행");
});

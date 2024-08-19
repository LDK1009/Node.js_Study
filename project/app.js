const express = require("express");
const path = require("path"); // 경로처리

const app = express();

// 변수 설정(port 변수에 3000 설정)
app.set("port", process.env.PORT || 3000);

// 미들웨어 사용
app.use((req, res, next) => {
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

app.listen(app.get("port"), () => {
  console.log("서버 실행");
});

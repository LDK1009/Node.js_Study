const http = require("http");

const server = http
  .createServer((req, res) => { // 서버로 요청이 오면 실행되는 함수
    res.write("<h1>Hello Node!</h1>"); // 응답 보내주기
    res.write("<h2>Hello Server!</h2>"); // 응답에 html태그를 담아보낼 수 있다
    res.end("<h3>Hello LEE!</h3>"); // 스트림 형태로 응답은 보낸다
  })
  // 서버 실행 및 대기(프로그램 => 프로세스)
  .listen(8080, () => {
    console.log("8080포트에서 서버 대기중"); // 서버 프로그램이 메모리에 올라가 프로세스로 실행되면 해당 코드가 실행된다.
  });

// 오류 처리
server.on("listening", () => {
  console.log("서버 정상 작동"); // 서버 프로그램이 메모리에 올라가 프로세스로 실행되면 해당 코드가 실행된다.
});
server.on("error", (error) => {
  console.error(error);
});

const http = require("http");
const fs = require('fs').promises;

const server = http
  .createServer(async(req, res) => { // 서버로 요청이 오면 실행되는 함수
    try{ // 오류 처리
      res.writeHead(200, { 'Content-Type': 'text/html; charset =utf-8'}) // 응답 데이터 종류 알려주기(html인지 문자열인지)
      const resData = await fs.readFile('./index.html'); // 파일 불러오기
      res.end(resData); // html 파일을 응답으로 전달
    }
    catch(error){
      console.log(error);
      res.writeHead(200, { 'Content-Type': 'text/plain; charset =utf-8'}) // 응답 데이터가 문자열임을 알려줌  
      res.end(error.message)
    }

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

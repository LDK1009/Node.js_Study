const express = require('express');

const app = express();

// 변수 설정(port 변수에 3000 설정)
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/main', (req, res) => {
    res.send('hello main');
})

app.get('/login', (req, res) => {
    res.send('hello login');
})

app.listen(app.get('port'), ()=>{
    console.log('서버 실행');
})
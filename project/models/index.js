const Sequelize = require("sequelize"); // Sequelize ORM 라이브러리 가져오기
const User = require("./user"); // User 모델 가져오기

const env = process.env.NODE_ENV || "development"; // 실행 환경 설정 (기본값: "development")
const config = require("../config/config.json")[env]; // config.json 파일에서 현재 환경에 맞는 설정 가져오기
const db = {}; // 데이터베이스 객체 초기화

// Sequelize 인스턴스 생성 (데이터베이스 연결 설정)
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // DB 객체에 Sequelize 인스턴스 추가
db.User = User; // DB 객체에 User 모델 추가

User.initiate(sequelize); // User 모델 초기화 (모델과 Sequelize 인스턴스 연결)

module.exports = db; // DB 객체를 모듈로 내보내기

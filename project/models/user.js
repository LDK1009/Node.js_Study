const Sequelize = require("sequelize"); // Sequelize ORM 라이브러리 가져오기

// User 모델 클래스 정의 (Sequelize.Model을 상속받음)
class User extends Sequelize.Model {
  // initiate 메서드에서 모델을 초기화
  static initiate(sequelize) {
    // User 모델의 스키마 정의
    User.init(
      {
        // name 필드: 최대 20자, null 허용하지 않음, 유일한 값이어야 함
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        // email 필드: 부호 없는 정수, null 허용하지 않음
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        // password 필드: 최대 20자, null 허용하지 않음
        password: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        profileImage: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize, // Sequelize 인스턴스를 통해 연결
        timestamps: true, // createdAt 및 updatedAt 타임스탬프 필드 자동 생성
        underscored: false, // 필드 이름을 camelCase로 유지 (스네이크 케이스가 아님)
        paranoid: true, // deletedAt 필드 추가 (소프트 삭제를 위해)
        modelName: "User", // 모델 이름 설정
        tableName: "Users", // 테이블 이름 설정
        charset: "utf8mb4", // 문자셋 설정 (이모지 지원)
        collate: "utf8mb4_general_ci", // 문자열 비교 방식 설정
      }
    );
  }
}

module.exports = User; // User 모델을 모듈로 내보내기

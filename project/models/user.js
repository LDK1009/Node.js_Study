const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "SeqUser",
        tableName: "SeqUsers",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}

module.exports = User;
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      //id는 mysql에 기본적으로 들어감 1, 2, 3, 4 순으로
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글저장, 이모티콘저장mb4
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};

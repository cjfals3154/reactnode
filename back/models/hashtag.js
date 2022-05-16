module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //id는 mysql에 기본적으로 들어감 1, 2, 3, 4 순으로
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수아님
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글저장, 이모티콘저장mb4
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};

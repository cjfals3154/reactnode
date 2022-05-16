module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      //id는 mysql에 기본적으로 들어감 1, 2, 3, 4 순으로
      src: {
        type: DataTypes.STRING(300),
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장, 이모티콘저장mb4
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};

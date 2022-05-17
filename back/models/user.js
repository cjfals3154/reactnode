module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //id는 mysql에 기본적으로 들어감 1, 2, 3, 4 순으로
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // true면 선택 false필수 이메일 로그인이 필수라서 false함
        unique: true, // 고유한값!!
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};

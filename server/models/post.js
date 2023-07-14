"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      user_id: DataTypes.STRING,
      type: DataTypes.ENUM([
        "Thực phẩm",
        "Đồ điện tử",
        "Đồ gia dụng",
        "Mỹ phẩm",
        "Quần áo",
        "Đồ chơi",
      ]),
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

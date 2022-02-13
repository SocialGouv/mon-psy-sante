import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class UserAccount extends Model {}

  UserAccount.init(
    {
      email: DataTypes.STRING,
      group: DataTypes.STRING,
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      password: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      modelName: "UserAccounts",
      sequelize,
      tableName: "user_account",
      underscored: true,
    }
  );
  return UserAccount;
};

import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class DSCursor extends Model {}

  DSCursor.init(
    {
      cursor: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      modelName: "dsCursors",
      sequelize,
      tableName: "ds_cursor",
      underscored: true,
    }
  );
  return DSCursor;
};

import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Psychologist extends Model {}

  Psychologist.init(
    {
      address: DataTypes.STRING,
      archived: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      emailPro: DataTypes.STRING,
      firstName: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.NUMBER,
      },
      instructorId: DataTypes.STRING,
      languages: DataTypes.STRING,
      lastName: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      phone: DataTypes.STRING,
      teleconsultation: DataTypes.BOOLEAN,
      website: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      modelName: "psychologists",
      sequelize,
      tableName: "psychologist",
      underscored: true,
    }
  );
  return Psychologist;
};

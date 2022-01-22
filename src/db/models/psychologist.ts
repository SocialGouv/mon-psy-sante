import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Psychologist extends Model {}

  Psychologist.init(
    {
      address: DataTypes.STRING,
      archived: DataTypes.BOOLEAN,
      cdsmsp: DataTypes.STRING,
      coordinates: DataTypes.GEOMETRY("POINT", 4326),
      firstName: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.NUMBER,
      },
      instructorId: DataTypes.STRING,
      languages: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      teleconsultation: DataTypes.BOOLEAN,
      website: DataTypes.STRING,
      withChildren: DataTypes.BOOLEAN,
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

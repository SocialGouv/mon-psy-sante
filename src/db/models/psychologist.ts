import { DataTypes, Model } from "sequelize";

import { SRID } from "../../types/const/geometry";

export default (sequelize) => {
  class Psychologist extends Model {}

  Psychologist.init(
    {
      address: DataTypes.STRING,
      archived: DataTypes.BOOLEAN,
      cdsmsp: DataTypes.STRING,
      coordinates: DataTypes.GEOMETRY("POINT", SRID),
      displayEmail: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.NUMBER,
      },
      instructorId: DataTypes.STRING,
      languages: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      public: DataTypes.STRING,
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

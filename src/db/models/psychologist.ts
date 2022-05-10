import { DataTypes, Model } from "sequelize";

import { SRID } from "../../types/const/geometry";

export default (sequelize) => {
  class Psychologist extends Model {}

  Psychologist.init(
    {
      address: DataTypes.TEXT,
      addressAdditional: DataTypes.TEXT,
      secondAddress: DataTypes.TEXT,
      secondAddressAdditional: DataTypes.TEXT,
      archived: DataTypes.BOOLEAN,
      cdsmsp: DataTypes.STRING,
      coordinates: DataTypes.GEOMETRY("POINT", SRID),
      secondAddressCoordinates: DataTypes.GEOMETRY("POINT", SRID),
      department: DataTypes.STRING,
      displayEmail: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.NUMBER,
      },
      languages: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      displayPhone: DataTypes.BOOLEAN,
      public: DataTypes.STRING,
      state: DataTypes.STRING,
      teleconsultation: DataTypes.BOOLEAN,
      visible: DataTypes.BOOLEAN,
      website: DataTypes.TEXT,
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

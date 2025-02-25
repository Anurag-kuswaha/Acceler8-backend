const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Resumes extends Model {
    static associate(models) {}
  }
  Resumes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING,
      },
      job_description: {
        type: DataTypes.TEXT,
      },
      job_company: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "resumes",
    }
  );
  return Resumes;
};

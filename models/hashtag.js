module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "hashtag",
    {
      name: {
        type: DataType.STRING(30),
        allowNull: false,
        primaryKey: true
      },
      count: {
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    },
    { timestamps: false, underscored: true }
  );
};

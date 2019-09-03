module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "hashtag",
    {
      hashtag_name: {
        type: DataType.TEXT,
        allowNull: false
      },
      count: {
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    },
    { timestamps: false, paranoid: false, underscored: true }
  );
};

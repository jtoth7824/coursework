module.exports = (sequelize, DataTypes) => {
    const ToDo = sequelize.define('ToDo', {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN,
    });
    return ToDo;
  };
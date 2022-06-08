module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("record", {
        country: {
            type: Sequelize.STRING(100)
        },
        year: {
            type: Sequelize.SMALLINT
        },
        value: {
            type: Sequelize.DOUBLE
        }
    });
    return Record;
};
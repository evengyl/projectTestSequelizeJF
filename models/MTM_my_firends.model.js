const { DataTypes, Sequelize } = require('sequelize');

/**
 * Constructeur du modele "MTM_my_friends"
 * @param {Sequelize} sequelize 
 */
module.exports = (sequelize) => {

    const MTM_my_friends = sequelize.define('MTM_my_friends', {
        isAccepted: {
            type: DataTypes.BOOLEAN,
            allowNull : true
        }
    },
    {
        tableName: 'MTM_my_friends',
        timestamps: true,
        updatedAt: true,
    });
    return MTM_my_friends
}
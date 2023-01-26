const { DataTypes, Sequelize } = require('sequelize');

/**
 * Constructeur du modele "User"
 * @param {Sequelize} sequelize 
 */
module.exports = (sequelize) => {

    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(200),
            unique: {
                name: 'UK_Member__Email'
            },
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        login : {
            type : DataTypes.STRING(50),
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    }, {
        tableName: 'user',
        timestamps: true,
        updatedAt: false,
    });







    User.belongsToMany(User, { as : "senders", through : MTM_my_friends, foreignKey : "userId"})
    User.belongsToMany(User, { as : "receivers", through : MTM_my_friends, foreignKey : "friendId"})

    return User;
};


const { Sequelize } = require('sequelize');

// Récuperation des variable d'environnment
const { DB_SERVER, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialisation de Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mysql'
});


// Création d'un objet "DB"
const db = {};

// Ajout de l'instance de sequelize
db.sequelize = sequelize;

// Ajout des models
db.MTM_my_friends = require('./MTM_my_friends.model')(sequelize);
db.User = require('./user.model')(sequelize);


// Ajout des relations

// - (One to Many)  Track <-> Genre 
/*
db.Genre.hasMany(db.Track, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'NO ACTION'
});
db.Track.belongsTo(db.Genre);
*/
// - (Many to Many) Track <-> Artist
/*
db.Track.belongsToMany(db.Artist, { through: 'track_artist' });
db.Artist.belongsToMany(db.Track, { through: 'track_artist' });
*/

// Export de l'objet "DB"
module.exports = db;

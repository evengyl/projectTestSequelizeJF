"use strict"

// Chargement du fichier d'environnement
require('dotenv').config({
    override: false
})

const express = require('express')
const router = require('./routers/router')


// Initialisation de la base de donnée (via sequelize)
const db = require('./models/index')

// - Connection
db.sequelize.authenticate()
    .then(() => console.log('Connection DB successfull'))
    .catch((error) => console.log('Connection DB fail' + error))

// - Sync avec la base de donnée (necessaire les droits DDL)
if (process.env.NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: true } })
}


// Création de la Web API
const app = express()

app.use(express.json())

// Ajout du routing
app.use('/api', router)

// Gestion des erreurs
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(error)
        res.status(500).json(error)
        return
    }

    res.sendStatus(500)
})

// Demarrage du serveur
app.listen(process.env.PORT, () => {
    console.log(`Web API up on port ${process.env.PORT}`)
})

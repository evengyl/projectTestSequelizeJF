const userService = require('../services/user.service')

const userController = {
    getAll: async (req, res) => {
        // Récuperation des données via le service
        const users = await userService.getAll()

        // Envoi des données via le modele de reponse de l'api
        res.status(200).json(users)
    },

    getById: async (req, res) => {
        // Recuperation l'id depuis la route
        const id = req.params.id

        // Récuperation des données via le service
        const data = await userService.getById(id)

        // Envoi d'un erreur 404 si aucunne donnée
        if (!data) {
            res.sendStatus(404)
            return
        }

        // Envoi des données via le modele de reponse de l'api
        res.json(data)
    },

    add: async (req, res) => {
        // Recuperation des données validées par le middleware "bodyValidation"
        const data = req.body

        if (!data.login) {
            res.status(422).json({'Invalid Data' : ""})
            return
        }

        if (data.login && await userService.checkIfLoginExists(data.login)) {
            res.status(400).json({"error" : `The login "${data.login}" already exists !`})
            return
        }

        const user = await userService.add(data)

        res.status(201).json(user)
    },

    update: async (req, res) => {
        // Recup de l'id
        const id = req.params.id

        // Recuperation des données validées par le middleware "bodyValidation"
        const data = req.body

        // Verrification que le pseudo est donné, si on n'a pas le nom et prénom
        if (!data.login) {
            res.status(422).json({'Invalid Data' : ""})
            return
        }

        let user = {}

        if (data.login) {
            const originalUser = await userService.getById(id)
            if(originalUser){
                user = await userService.update(id, data)
            }
        }

        if (!user) {
            res.sendStatus(404)
            return
        }
        res.status(226).json(user)
    },

    delete: async (req, res) => {
        const id = req.params.id

        const isDeleted = await userService.delete(id)

        if (!isDeleted) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(200)
    },
    

    addFriend : async (req, res) => {

        const id = req.params.id
        const idFriend = req.body.idFriend

        await userService.addFriend(id, idFriend)

        res.sendStatus(418)
    }
}

module.exports = userController
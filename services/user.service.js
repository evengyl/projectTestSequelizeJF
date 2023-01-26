const { Op } = require('sequelize')
const { addFriend } = require('../controllers/users.controller')
const UserDTO = require('../dto/user.dto')
const db = require('../models')

const userService = {

    getAll: async () => {

        const rows = await db.User.findAll()

        // Envoi des données dans un objet DTO
        return {
            users: rows.map(user => new UserDTO(user)),
        }
    },

    getById: async (id) => {
        const user = await db.User.findByPk(id)

        if (!user) {
            return null
        }

        // Envoi des données dans un objet DTO
        return new UserDTO(user)
    },

    add: async (data) => {
        if (!data) {
            throw new Error('Data is required !')
        }

        // 
        const newUser = await db.User.create(data)

        // Envoi des données dans un objet DTO
        return new UserDTO(newUser)
    },

    update: async (id, data) => {

        if (!data) {
            throw new Error('Data is required !')
        }
        let dataToSave = {}
        dataToSave.login = data.login

        const dataUpdated = await db.User.update(dataToSave, {
            where: { id },
            validate: true
        })

        if (dataUpdated[0] !== 1) {
            return null
        }

        // Envoi des données dans un objet DTO
        let userUpdated = await userService.getById(id)
        return new UserDTO(userUpdated)
    },

    delete: async (id) => {

        const nbRowDeleted = await db.User.destroy({
            where: { id }
        })

        return nbRowDeleted === 1
    },

    checkIfLoginExists: async (login) => {

        const user = await db.User.findOne({
            where: { login }
        })

        return user !== null
    },


    addFriend : async (id, idFriend) => {

        let saveMyFriend = {}
        saveMyFriend.friendId = idFriend

        let user1 = await db.User.findOne({
            where : { id : 1 },
            include : [{ model : db.User, as : "senders"}, { model : db.User, as : "receivers"}],
        })


        //method magic,
        //insert OK
        /*
        user1.addSenders({idFriend : 2}, {
            through : {
                isAccepted : false
            }
        })
        */


        //update NOK
        let user2 = await db.User.findOne({
            where : { id : 2 },
            include : [{ model : db.User, as : "senders"}, { model : db.User, as : "receivers"}],
        })

        user2.update({ isAccepted : 1}, {
                where: { idFriend : 2, id : 1 }
            })
            .then((res) => {
                console.log(res.dataValues)
            })
            .catch((error) => {
                console.log(error)
            })

        

/*
        let test = await db.User.create({
            id : id,
            friendId : id
        },
        {
            include : [{
                association : db.User,
                include : [db.User]
            }]
        }
        
        )
        .catch((error) => {
            console.log(error)
        })
        console.log(test)
*/
/*
        let returned = await db.User.update(saveMyFriend, {
            where: { id },
            validate: true,
            
        })*/

    }
}

module.exports = userService
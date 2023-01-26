class UserDTO {

    id
    login
    email
    
    constructor(data) {
        this.id = data.id
        this.login = data.login
        this.email = data.email
    }
}

module.exports = UserDTO
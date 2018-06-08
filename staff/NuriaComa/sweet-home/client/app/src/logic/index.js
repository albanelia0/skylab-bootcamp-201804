'use strict'

const shApi = require('api')

shApi.url = 'http://localhost:4000/api'

const logic = {
    userId: 'NO-ID',
    data: 'NO-DATA',
    users: 'NO-USERS',

    registerUser(name, surname, phone, dni, password) {
        return shApi.registerUser(name, surname, phone, dni, password)
            .then((res) => true)
    },

    authenticateUser(dni, password) {
        return shApi.authenticateUser(dni, password)
            .then(id => {
                this.userId = id

                return id
            })
    },

    retrieveUser(id) {
        return shApi.retrieveUser(id)
            .then(res => {

                this.data = res.data

                return true
            })
    },

    updateUser(id, name, surname, phone, dni, password, newPassword) {
        return shApi.updateUser(id, name, surname, phone, dni, password, newPassword)
            .then(users => {
                return users
            })
    },
    listUsers() {
        return shApi.listUsers()
        .then(res => {
            console.log(res)
            this.users = res

            return this.users
        })
    },

    unregisterUser(id, dni, password) {
        return shApi.unregisterUser(id, dni, password)
            .then((res) => true)
    }
}

module.exports = logic
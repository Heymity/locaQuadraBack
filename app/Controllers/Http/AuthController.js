'use strict'

class AuthController {

    async register({ request }){

        const User = use('App/Models/User')

        const data = request.only(['username', 'email', 'password', 'admin', 'institution'])
 
        const user = await User.create(data)
 
        return user
 
    }

    async index()
    {
        const User = use('App/Models/User')
        const users = await User.all()
        return users
    }
 
    async authenticate({ request, auth }){

        const { email, password } = request.all()
 
        const token = await auth.attempt(email, password)
 
        return token
 
    }

}

module.exports = AuthController

'use strict'

class AuthController {

    async register({ request }){

        const User = use('App/Models/User')

        const data = request.only(['username', 'email', 'password', 'admin', 'institution', 'institution_id'])
 
        const user = await User.create(data)
        
        console.log(data)

        return user
 
    }

    async update ({ params, request, response }) {
        const user = await Institution.findOrFail(params.id)
        const data = request.only(["name", "image"])
        if (user.id != auth.user.id){
            user.merge(data)
          await user.save()
          return user
        }
        else {
          return response.status(401)
        }
    }

    async index()
    {
        const User = use('App/Models/User')
        const users = await User.all()
        return users
    }

    async atual({ request })
    {

        const User = use('App/Models/User')
        const Database = use('Database')
        const { email } = request.all()

        var users = await Database.from('users').where('email', email)
        var ins = await Database.from('institutions').where('user_id', users[0].id)
        var img = await Database.from('images').where('user_id', users[0].id)
        users.push(ins[0])
        var insimg = await Database.from('images').where('institution_id', users[1].id)
        if(img[0] == undefined)
        {
            img = await Database.from('images').where('id', 1)
        }
        console.log(img[0])
        users.push(img[0])
        users.push(insimg[0])

        return users
    }
 
    async authenticate({ request, auth }){

        let resp = []

        const Database = use('Database')
        const { email, password } = request.all()
 
        const token = await auth.attempt(email, password)
        const user = await Database.from('users').where('email', email)
        resp.push(token)
        resp.push(user[0])

        return resp
 
    }

}

module.exports = AuthController

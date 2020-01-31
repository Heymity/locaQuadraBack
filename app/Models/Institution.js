'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Institution extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    courtReservation () {
        return this.hasMany('App/Models/CourtReservation')
    }
    images () {
        return this.hasMany('App/Models/Image')
    }
    squad () {
        return this.hasMany('App/Models/Squad')
    }
}

module.exports = Institution

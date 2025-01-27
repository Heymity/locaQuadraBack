'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Court extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    courtReservation () {
        return this.hasMany('App/Models/CourtReservation')
    }
    images () {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Court

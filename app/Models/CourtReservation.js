'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CourtReservation extends Model {
    institution () {
        return this.belongsTo('App/Models/Institution')
    }
    court () {
        return this.belongsTo('App/Models/Court')
    }
}

module.exports = CourtReservation

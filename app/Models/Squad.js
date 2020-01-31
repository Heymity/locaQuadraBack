'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Squad extends Model {
    institution () {
        return this.belongsTo('App/Models/Institution')
    }    
    images () {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Squad

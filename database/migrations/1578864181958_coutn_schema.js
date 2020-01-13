'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourtSchema extends Schema {
  up () {
    this.alter('courts', (table) => {
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('courts')
  }
}

module.exports = CourtSchema

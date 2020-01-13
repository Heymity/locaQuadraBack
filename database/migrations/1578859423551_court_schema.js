'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourtSchema extends Schema {
  up () {
    this.create('courts', (table) => {
      table.increments()
      table.string('name', 240).notNullable()
      table.string('image', 240).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('courts')
  }
}

module.exports = CourtSchema

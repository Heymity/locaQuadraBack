'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourtSchema extends Schema {
  up () {
    this.alter('courts', (table) => {
      table.string('description', 240)
    })
  }

  down () {
    this.drop('courts')
  }
}

module.exports = CourtSchema

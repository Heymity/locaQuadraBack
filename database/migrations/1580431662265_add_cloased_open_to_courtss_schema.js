'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourtSchema extends Schema {
  up () {
    this.alter('courts', (table) => {
      table.boolean('closed')
    })
  }

  down () {
    this.drop('courts')
  }
}

module.exports = CourtSchema

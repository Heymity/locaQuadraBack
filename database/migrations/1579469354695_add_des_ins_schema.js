'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
  up () {
    this.alter('institutions', (table) => {
      table.string('description', 240)
    })
  }

  down () {
    this.drop('institutions')
  }
}

module.exports = InstitutionSchema

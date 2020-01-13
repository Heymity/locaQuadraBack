'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
  up () {
    this.create('institutions', (table) => {
      table.increments()
      table.string('name', 240).notNullable()
      table.string('image', 240)
      table.timestamps()
    })
  }

  down () {
    this.drop('institutions')
  }
}

module.exports = InstitutionSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SquadSchema extends Schema {
  up () {
    this.create('squads', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 240).notNullable()
      table.integer('toReserv').notNullable()
      table
       .integer('institution_id')
       .unsigned()  
       .references('id')
       .inTable('institutions')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
       .notNullable()
      table.string('description', 240)
    })
  }

  down () {
    this.drop('squads')
  }
}

module.exports = SquadSchema

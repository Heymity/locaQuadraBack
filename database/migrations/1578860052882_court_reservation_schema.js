'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourtReservationSchema extends Schema {
  up () {
    this.create('court_reservations', (table) => {
      table.increments()
      table.integer('institution_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('institutions')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.integer('court_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('courts')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.timestamp('timeIn')
      table.timestamp('timeOut')
      table.timestamps()
    })
  }

  down () {
    this.drop('court_reservations')
  }
}

module.exports = CourtReservationSchema

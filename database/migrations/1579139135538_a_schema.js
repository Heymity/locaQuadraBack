'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.integer('institution_id')
      .unsigned()
      .references('id')
      .inTable('institutions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

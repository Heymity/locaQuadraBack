'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('admin').defaultTo(false)
      table.boolean('institution').defaultTo(false)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

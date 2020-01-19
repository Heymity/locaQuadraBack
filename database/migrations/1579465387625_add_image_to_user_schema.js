'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
 up () {
   this.alter('images', (table) => {
      table
       .integer('user_id')
       .unsigned()
       .references('id')
       .inTable('users')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
   })
 }

 down () {
   this.drop('images')
 }
}

module.exports = ImageSchema
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
 up () {
   this.alter('images', (table) => {
      table
       .integer('squad_id')
       .unsigned()
       .references('id')
       .inTable('squads')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
   })
 }

 down () {
   this.drop('images')
 }
}

module.exports = ImageSchema
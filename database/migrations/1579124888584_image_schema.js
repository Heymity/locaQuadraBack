'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
 up () {
   this.create('images', (table) => {
     table.increments()
          table
       .integer('institution_id')
       .unsigned()
       .references('id')
       .inTable('institutions')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
       table
       .integer('court_id')
       .unsigned()
       .references('id')
       .inTable('courts')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
     table.string('path').notNullable()
     table.timestamps()
   })
 }

 down () {
   this.drop('images')
 }
}

module.exports = ImageSchema
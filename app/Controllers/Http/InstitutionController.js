'use strict'


const Institution = use('App/Models/Institution')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with institutions
 */
class InstitutionController {
  /**
   * Show a list of all institutions.
   * GET institutions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const institutions = await Institution.query().with("user").with("courtReservation").fetch()
    var imageInstitutions = [];
    for (var i = 0;i < institutions.rows.length;i++)
    {
      var institution = institutions.rows[i]
      await institution.load('images')
      imageInstitutions.push(institution)
    }
    return imageInstitutions
  }


  /**
   * Create/save a new institution.
   * POST institutions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(["name", "image"])
    const institution = await Institution.create({ user_id: auth.user.id,...data })
    return institution
  }

  /**
   * Display a single institution.
   * GET institutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const institution = await Institution.query().with("user").fetch(params.id)
    institution.load('images')
    return institution
  }


  /**
   * Update institution details.
   * PUT or PATCH institutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const institution = await Institution.findOrFail(params.id)
    const data = request.only(["name", "image"])
    if (institution.user_id != auth.user.id){
      institution.merge(data)
      await institution.save()
      return institution
    }
    else {
      return response.status(401)
    }
  }

  /**
   * Delete a institution with id.
   * DELETE institutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  
   async destroy ({ params, auth, response }) {

    const institution = await Institution.findOrFail(params.id)

    if (institution.user_id != auth.user.id){
     return response.status(401)
    }

    await institution.delete()

  }
}

module.exports = InstitutionController

'use strict'

const CourtReservation = use('App/Models/CourtReservation')
const Institution = use('App/Models/Institution')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with courtreservations
 */
class CourtReservationController {
  /**
   * Show a list of all courtreservations.
   * GET courtreservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const courtReservation = await CourtReservation.query().with("court").with("institution").fetch()
    return courtReservation
  }


  /**
   * Create/save a new courtreservation.
   * POST courtreservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(["timeIn", "timeOut", "court_id", "institution_id"])
    if(auth.user.institution == true)
    {

      const courtReserv = await CourtReservation.create({ ...data })
      return courtReserv
    }
  }

  /**
   * Display a single courtreservation.
   * GET courtreservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const courtReservation = await CourtReservation.query().with("court").with("institution").fetch(params.id)
    return courtReservation
  }


  /**
   * Update courtreservation details.
   * PUT or PATCH courtreservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {
    const courtReserv = await CourtReservation.findOrFail(params.id)
    const data = request.only(["timeIn", "timeOut"])
    const institution = await Institution.findOrFail(courtReserv.institution_id)
    if (institution.user_id == auth.user.id){
      courtReserv.merge(data)
      await courtReserv.save()
      return courtReserv
    }
    else {
      return response.status(401)
    }
  }

  /**
   * Delete a courtreservation with id.
   * DELETE courtreservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth }) {
    
    const courtReserv = await CourtReservation.findOrFail(params.id)
    const institution = await Institution.findOrFail(courtReserv.institution_id)
    if (institution.user_id == auth.user.id){
      await courtReserv.delete()
    }
  }
}

module.exports = CourtReservationController

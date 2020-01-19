'use strict'

const Court = use('App/Models/Court')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with courts
 */
class CourtController {
  /**
   * Show a list of all courts.
   * GET courts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const courts = await Court.query().with("user").with("courtReservation").fetch()
    var imageCourts = [];
    for (var i = 0;i < courts.rows.length;i++)
    {
      var court = courts.rows[i]
      await court.load('images')
      imageCourts.push(court)
      //console.log(court)
    }
    return imageCourts
  }

  /**
   * Create/save a new court.
   * POST courts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(["name", "image", "description"])
    if (auth.user.admin == true){
      const court = await Court.create({ user_id: auth.user.id,...data })
      return court
    }
    return response.status(401)
  }

  /**
   * Display a single court.
   * GET courts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const court = await Court.query().with("user").fetch(params.id)
    court.load('images')
    return court
  }


  /**
   * Update court details.
   * PUT or PATCH courts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request }) {
    const court = await Court.findOrFail(params.id)
    const data = request.only(["name", "image", "description"])
    if (auth.user.admin == true){
      court.merge(data)
      await court.save()
      return court
    }
    else {
      return response.status(401)
    }

  }

  /**
   * Delete a court with id.
   * DELETE courts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const court = await Court.findOrFail(params.id)

    if (auth.user.admin != true){
     return response.status(401)
    }

    await court.delete()
  }
}

module.exports = CourtController

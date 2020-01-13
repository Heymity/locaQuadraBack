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
    const court = await Court.query().with("user").fetch()
    return court
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
    const data = request.only(["name", "image"])
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
    const data = request.only(["name", "image"])
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

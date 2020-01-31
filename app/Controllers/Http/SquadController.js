'use strict'

const Squad = use('App/Models/Squad')

class SquadController {
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
    const squads = await Squad.query().with("institution").fetch()
    var imageSquads = [];
    for (var i = 0;i < squads.rows.length;i++)
    {
      var squad = squads.rows[i]
      await squad.load('images')
      imageSquads.push(squad)
    }
    return imageSquads
  }

  async insIndex ({ params }) {
    const squads = await Squad.query().with("institution").fetch()
    var imageSquads = [];
    for (var i = 0;i < squads.rows.length;i++)
    {
      var squad = squads.rows[i]
      await squad.load('images')
      if(squad.institution_id == params.id) {
        imageSquads.push(squad)
      }
    }
    return imageSquads
  }

  /**
   * Create/save a new institution.
   * POST institutions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(["name", "toReserv", "description", "institution_id"])
    const squad = await Squad.create({ ...data })
    return squad
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
    const squad = await Squad.query().with("institution").with("images").fetch(params.id)
    //squad.load('images')
    return squad
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
    const squad = await Squad.findOrFail(params.id)
    const data = request.only(["name", "image", "description"])
    if (squad.institution_id != request.only(["institution_id"])){
      squad.merge(data)
      await squad.save()
      return squad
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
  
   async destroy ({ params, response, request }) {

    const squad = await Squad.findOrFail(params.id)
    console.log(squad.institution_id, request.only(["institution_id"]).institution_id)
    if (squad.institution_id != request.only(["institution_id"]).institution_id){
     return 401
    }

    await squad.delete()

  }
}

module.exports = SquadController

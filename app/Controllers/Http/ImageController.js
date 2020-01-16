'use strict'

const Image = use('App/Models/Image')
const Court = use('App/Models/Court')
const Institution = use('App/Models/Institution')

const Helpers = use('Helpers')

class ImageController {
   
    async store ({ params, request }) {
        
        const profile = await Institution.findOrFail(params.id)
        console.log(profile)
        const images = request.file('image', {
          types: ['image'],
          size: '10mb'
        })
        console.log("Still going")
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))
        console.log("Still going")
        if (!images.movedAll()) {
          return images.errors()
        }
        console.log("Still going")
        await Promise.all(
          images
            .movedList()
            .map(image => profile.images().create({ path: image.fileName }))
        )  
        console.log("Still going")
    }
      
    async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }
      
   }
   
   module.exports = ImageController
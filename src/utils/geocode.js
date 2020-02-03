const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZW9mMTk1NyIsImEiOiJjazV2dWQ0dHQwMWt1M2VuemRhZjR2d2dxIn0._icIDa5xMflfFb-nJoUtPg&limit=1'
    request ({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services')
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find geo location')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
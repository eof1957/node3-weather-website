const request = require('request')
const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b73d9ad2541c0689b84b87970cdda193/' + longitude + ','
                 + latitude
    request ({url, json: true}, (error, {body}) => {
    if (error){
        callback('Unable to connect to forecast service!', undefined)
    } else if (body.error) {
        callback('Unable to find forecast.', undefined)
    }
    else{
        callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees out. Theres is a ' +
        body.currently.precipProbability + '% chance of rain')
    }
    })
}

module.exports = forecast
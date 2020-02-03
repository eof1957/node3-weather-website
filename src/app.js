const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicdirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicdirectory))
 
app.get('', (req, res) => {
    res.render('index',
    {title: 'Weather',
    name: 'EOF'})
})

app.get('/about', (req, res) => {
    res.render('about',
    {title: 'a long story',
    name: 'EOF'})
})

app.get('/help', (req, res) => {
    res.render('help',
    {title: 'Help',
    name: 'EOF',
    helpText: 'This is some helpful text.'
})
})
app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error)
        {
            return res.send({error})
        }
            forecast( latitude, longitude, (error, data2) => {
                if (error)
                {
                    return res.send({error})
                }
                res.send({location,
                          forecast: data2,
                        address: req.query.address})
            })
        })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',
    {
        title: '404',
        name: 'EOF',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',
    {
        title: '404',
        name: 'EOF',
        message: 'Page not found'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('http server started at port 3000')
})
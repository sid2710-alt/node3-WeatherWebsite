const path = require('path')
const express = require('express')
 const geocode=require('./utils/geocode')
 const forecast=require('./utils/forecast')
const hbs = require('hbs')
const { title } = require('process')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        name: 'Andrew Mead'
    })
})
app.get('/weather',(request, res)=>{
    if(!request.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(request.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})

        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
     
             }
             res.send({
                 forecast:forecastdata,
                 location,
                 address:request.query.address
                 
             })
        })
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.get('*',(req,res)=>{
    res.render('error404',{
        name:'Siddhant',
        title:'Error',
        errormessage:'404 not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
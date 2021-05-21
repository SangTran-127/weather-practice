const express = require('express')
const https = require('https')
var bodyParser = require('body-parser')
const app = express()
const port = 5000
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/', (req, res) => {
    const city = req.body.cityName
    const unit = 'metric'
    const key = 'e6f22eda1339223a45df5599399f6388'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`
    https.get(url, (response) => {
         console.log(response.statusCode)
         response.on('data', (data) => {
             const weatherData = JSON.parse(data)
             const temp = weatherData.main.temp
             const weatherDescription = weatherData.weather[0].description
             const icon = weatherData.weather[0].icon
             const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
             res.write(`<h1>The weather is currently ${weatherDescription}</h1>`)
             res.write(`<h2>The weather temp in ${city} is ${temp} degrees Celcius</h2>`)
             res.write(`<img src= "${imgURL}"/>`)
             res.send()
             
         })
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//e6f22eda1339223a45df5599399f6388

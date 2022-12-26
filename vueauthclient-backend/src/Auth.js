const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const morgan = require('morgan')
const formidable = require('express-formidable')//
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(formidable())

const port = process.env.PORT || 3000
//
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.json())
var router = require('../vueauthclient-backend/router')
app.use('/.netlify/functions/Auth', router)

// app.listen(port, () => {
//   console.log(`listening on ${port}`)
// })

module.exports.handler = serverless(app);

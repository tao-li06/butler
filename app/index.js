import handle from './handlers'
import command from './handlers/command'

const express = require('express')
const next = require('next')
var bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleNext = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(bodyParser.json()); 

  handle(server)

  server.get('/api/:device/:command', (req, res) => {
    command(req, res)
  })
  
  server.get('*', (req, res) => {
    handleNext(req, res)
  })
  server.listen(3000)
})
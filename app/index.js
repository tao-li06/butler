import command from './handlers/command'

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/r/:subreddit', (req, res) => {
    return app.render(req, res, '/b', {
      ...req.query,
      subreddit: req.params.subreddit
    })
  })

  server.get('/api/:device/:command', (req, res) => {
    command(req, res)
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })
  server.listen(3000)
})
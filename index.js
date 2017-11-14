let http = require('http')
let createHandler = require('github-webhook-handler')
let secret = process.env.SECRET;
let port = process.env.PORT || 80;
let handler = createHandler({ path: '/webhook', secret })

if (!secret) throw new Error('environment SECRET is not defined')

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(port)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received an push event')
  console.dir(event.payload)
})

handler.on('issues', function (event) {
  console.log('Received an issue event')
  console.dir(event.payload)
})

handler.on('project_card', function (event) {
  console.log('Received an project card event')
  console.dir(event.payload)
})

console.log(`listen ${port}`)

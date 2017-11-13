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
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

console.log(`listen ${port} ${secret}`)

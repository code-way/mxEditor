const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
app.get('/users', db.getUsers)
 app.get('/users/:code', db.getUserById)
 app.post('/users', db.createUser)
 app.put('/users/:code', db.updateUser)
 app.delete('/users/:code', db.deleteUser)
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
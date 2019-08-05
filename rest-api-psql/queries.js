var moment = require('moment');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'sunny123',
  port: 5432,
})
const xml2js = require('xml2js');
const fs = require('fs');
let xml_string = fs.readFileSync("survey.xml", "utf8");
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)

  })
}
const getUserById = (request, response) => {
  const code = parseInt(request.params.code)

  pool.query('SELECT * FROM users WHERE code = $1', [code], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
   //const { code } = request.body
  console.log('request.body', request.body)
pool.query('INSERT INTO users (editordata,createddate,updateddate) VALUES ($1, $2, $3) RETURNING *',
 [request.body.xml,moment(new Date()),moment(new Date())], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with code`)
  })
}

const updateUser = (request, response) => {
  const code = parseInt(request.params.code)
  const { editordata } = request.body

  pool.query(
    'UPDATE users SET editordata = $1 WHERE code = $2',
    [editordata, code],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with code: ${code}`)
    }
  )
}

const deleteUser = (request, response) => {
  const code = parseInt(request.params.code)

  pool.query('DELETE FROM users WHERE code = $1', [code], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with code: ${code}`)
  })
}

module.exports = {
  getUsers,
   getUserById,
   createUser,
   updateUser,
  deleteUser,
}
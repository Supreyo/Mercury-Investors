const express = require('express')
const app = express()

const passport = require('passport')
const dbObj = require('../vueauthclient-backend/database')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const db = mysql.createConnection({
  host: '35.223.116.88',
  user: 'mercuryinvestors',
  database: 'mercury_investors',
  password: 'Mercury123'
})

app.post('/api/', async (req, res, next) => {
  var username = req.body.email
  var pwd = req.body.password

  var sql = 'select case when exists (SELECT * FROM Users WHERE UserName = "' + username + '" ) then 1 else 0 end AS Unit'
  // eslint-disable-next-line handle-callback-err
  db.query(sql, (error, results) => {
    console.log(results)
    if (results[0].Unit < 1) {
      console.log('user doesnt exist')
      // return 0
    } else {
      var sql = "SELECT Hash from Users where UserName='" + username + "' "

      db.query(sql, (error, results) => {
        if (results === 0) {
          return console.error(error.message)
        } else {
          let HashPwd = Object.values(JSON.parse(JSON.stringify(results)))
          HashPwd = HashPwd[0].Hash
          bcrypt.compare(pwd, HashPwd, (error, res) => {
            if (error) console.log(error)
            if (res) {
              console.log(res)
              Auth()
            }
          })
        }
      })
    }
  })
  function Auth () {
    res.send('yes')
  }
})

/*
app.get('/api/logout', function (req, res) {
  req.logout()
  console.log('logged out')
  return res.send()
})
*/
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

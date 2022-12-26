const {createPool} = require('mysql')

const pool = createPool({
  host: '35.223.116.88',
  user: 'mercuryinvestors',
  database: 'mercury_investors',
  password: 'Mercury123'
})
console.log(pool)

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'danxu'
  host: 'localhost',
  database: 'zagat',
  password: '',
  port: 5432,
})
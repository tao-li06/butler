import config from '../config'

console.log(config)

const knex = require('knex')(config.db)

export default knex
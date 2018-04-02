import config from '../config'

const knex = require('knex')(config.db)

export default knex
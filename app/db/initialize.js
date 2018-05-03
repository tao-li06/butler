
import knex from './db'
import * as _ from 'lodash'
import sequence from 'when/sequence'
import schema from './schema'
import { User, md5Passowrd } from '../db/models'
import schemaInstaller from 'knex-schema-builder'
import path from 'path'

const schemaPath = path.join(__dirname, './schema')

const init = () => {
  return new Promise((resolve, reject) => {
    schemaInstaller.isInstallNeeded(knex, schemaPath, (err, required) => {
      if (err) {
        console.log(`Fail to check existing db schema version, error : ${err}`)
        reject(err)
      } else {
        if (!required) {
          resolve()
        } else {
          schemaInstaller.install(knex, schemaPath, (error) => {
            if (error) {
              console.log(`Fail to install schema, error: ${error}`)
              reject(error)
            } else {
              User.forge({
                name: 'root',
                password: md5Passowrd('password'),
                is_admin: true
              })
              .save()
              .then(resolve)
              .catch(reject)
            }
          })
        }
      }
    })
  })
}

  
export default init

import knex from './db'
import * as _ from 'lodash'
import sequence from 'when/sequence'
import schema from './schema'
import { User, md5Passowrd } from '../db/models'

const createTable = (tableName) => {
    return knex.schema.createTable(tableName, (table) => {
      var column;
      var columnKeys = _.keys(schema[tableName]);
      _.each(columnKeys, (key) => {
        if (schema[tableName][key].type === 'text' && schema[tableName][key].hasOwnProperty('fieldtype')) {
          column = table[schema[tableName][key].type](key, schema[tableName][key].fieldtype);
        }
        else if (schema[tableName][key].type === 'string' && schema[tableName][key].hasOwnProperty('maxlength')) {
          column = table[schema[tableName][key].type](key, schema[tableName][key].maxlength);
        }
        else {
          column = table[schema[tableName][key].type](key);
        }
        if (schema[tableName][key].hasOwnProperty('nullable') && schema[tableName][key].nullable === true) {
          column.nullable();
        }
        else {
          column.notNullable();
        }
        if (schema[tableName][key].hasOwnProperty('primary') && schema[tableName][key].primary === true) {
          column.primary();
        }
        if (schema[tableName][key].hasOwnProperty('unique') && schema[tableName][key].unique) {
          column.unique();
        }
        if (schema[tableName][key].hasOwnProperty('unsigned') && schema[tableName][key].unsigned) {
          column.unsigned();
        }
        if (schema[tableName][key].hasOwnProperty('references')) {
          column.references(schema[tableName][key].references);
        }
        if (schema[tableName][key].hasOwnProperty('defaultTo')) {
          column.defaultTo(schema[tableName][key].defaultTo);
        }
      });
    });
  }

 const createTables = () => {
    var tables = [];
    var tableNames = _.keys(schema);
    tables = _.map(tableNames, function (tableName) {
      return function () {
        return createTable(tableName);
      };
    });
    return sequence(tables);
  }

  
createTables()
  .then(function() {
    console.log('Tables created!!');
    return User.forge({
      name: 'root',
      password: md5Passowrd('password'),
      is_admin: true
    })
    .save()
  })
  .then(() => process.exit(0))
  .catch(function (error) {
    throw error;
  })
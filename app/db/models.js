import bookshelf from 'bookshelf'
import knex from './db'
import crypto from 'crypto'

const Bookshelf = bookshelf(knex)

export const User = Bookshelf.Model.extend({
    tableName: 'users'
})

export const Device = Bookshelf.Model.extend({
    tableName: 'devices'
})

export const AuthToken = Bookshelf.Model.extend({
    tableName: 'auth_tokens',
    hasTimestamps: true,
})

export const Users = Bookshelf.Collection.extend({
    model: User
})

export const Devices = Bookshelf.Collection.extend({
    model: Device
})

export const AuthTokens = Bookshelf.Collection.extend({
    model: AuthToken
})

export const md5Passowrd = (password) => crypto.createHash('md5').update(password).digest('hex')

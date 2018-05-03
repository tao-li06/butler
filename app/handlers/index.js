import * as devices from './devices'
import * as users from './users'
import { AuthToken } from '../db/models'

const authorize = async (req, res, next) => {
    const { path } = req
    if (!!path && path.startsWith('/api/') && path != '/api/login') {
        const token = req.headers['authorization'] || req.query.auth_token
        if (!token) {
            res.status(403).json({})
        } else {
            const auth_token = await AuthToken.forge({ auth_token: token}).fetch()
            if (!!auth_token) {
                next()
            } else {
                res.status(403).json({})
            }
        }
    } else {
        next()
    }
    
}

const initializeHandlers = (server) => {
    server.use(authorize)

    server.put('/api/users', users.save)
    server.post('/api/login', users.token)

    server.put('/api/devices/:name', devices.save)
    server.get('/api/devices/:name', devices.get)
    server.post('/api/devices/:name', devices.update)
    server.get('/api/devices/:name/:command', devices.command)
    server.get('/api/devices', devices.list)
}


export default initializeHandlers
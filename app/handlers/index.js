import * as devices from './devices'
import * as users from './users'

const initializeHandlers = (server) => {
    server.put('/api/users', users.save)
    server.post('/api/login', users.token)

    server.put('/api/devices/:name', devices.save)
    server.get('/api/devices/:name', devices.get)
    server.post('/api/devices/:name', devices.update)
    server.get('/api/devices/:name/:command', devices.command)
    server.get('/api/devices', devices.list)
}

export default initializeHandlers
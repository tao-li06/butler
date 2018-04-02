import * as devices from './devices'

const initializeHandlers = (server) => {
    server.put('/api/devices/:name', devices.save)
    server.get('/api/devices/:name', devices.get)
    server.post('/api/devices/:name', devices.update)
    server.get('/api/devices/:name/:command', devices.command)
    server.get('/api/devices', devices.list)
}

export default initializeHandlers
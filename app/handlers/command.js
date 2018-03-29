import miio from 'miio'
import getConfig from '../devices/config'

const command = async (req, res) => {
    const deviceParam = req.params.device
    const commandParam = req.params.command
    const config = getConfig(deviceParam)
    if (!config || !config.commands[commandParam]) {
        res.send(404)
        return
    }
    const command = config.commands[commandParam]
    const device = await miio.device(config)
    const result = await device[command]()
    res.send('ok');
}

export default command
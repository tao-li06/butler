import miio from 'miio'
import * as commands from './commands'

const COMMANDS = Object.freeze({
    [commands.COMMAND_LOCATE_DEVICE]: 'find',
    [commands.COMMAND_START]: 'activateCleaning',
    [commands.COMMAND_PAUSE]: 'pause',
    [commands.COMMAND_STOP]: 'deactivateCleaning',
    [commands.COMMAND_CHARGE]: 'activateCharging',
    [commands.COMMAND_RESUME]: 'activateSpotClean'
})

export const getDevice = async (json) => {
    try {
        const device = await miio.device(json)
        return device
    } catch(e) {
        console.log("Can't find device, error : " + e)
        return null
    }
}

export const runCommand = async (command, json) => {
    if (!COMMANDS[command]) {
        return null
    }
    const device = await miio.device(json)
    const result = await device[COMMANDS[command]]()
    return result
}
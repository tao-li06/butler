import * as mi from './mi'

export const TYPE_MI = 'mi'

const map = Object.freeze({
    [TYPE_MI]: mi
})


export const getDevice =  async (type, config) => {
    if (!map[type]) {
        return null
    }
    return await map[type].getDevice(config)
}
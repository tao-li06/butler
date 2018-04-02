import miio from 'miio'

export const getDevice = async (json) => {
    try {
        console.log(json)
        const device = await miio.device(json)
        return device
    } catch(e) {
        console.log("Can't find device, error : " + e)
        return null
    }
}
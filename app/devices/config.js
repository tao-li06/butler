const config = Object.freeze({
    'vacuum': {
        address: '192.168.0.18', 
        token: '77614667465362784859315474703736',
        commands: {
            'locate-device': 'find',
            'start': 'activateCleaning',
            'pause': 'pause',
            'stop': 'deactivateCleaning',
            'charge': 'activateCharging',
            'resume': 'activateSpotClean'
        }
    }
});

const getConfig = (name) => {
    return config[name];
}

export default getConfig;
import { Device, Devices } from '../db/models'
import { getDevice, runCommand } from '../devices'


export const save = async (req, res) => {
  const d = await getDevice(req.body.type, {
    address: req.body.ip,
    token: req.body.token
  })
  if (!d) {
    res.status(400).json({error: true, data: { message: "Can't find device" }});
  } else {
    Device.forge({
      type: req.body.type,
      name: req.params.name,
      ip: req.body.ip,
      token: req.body.token
    })
      .save()
      .then((device) => es.json({ error: false, data: { id: device.get('id')}}))
      .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
  }
};

export const list = async (req, res) => {
  Devices.forge()
    .fetch()
    .then((collection) => res.json(collection.toJSON()))
    .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
}

export const get = async (req, res) => {
  const name = req.params.name
  Device.forge({ name })
  .fetch()
  .then((device) => {
    if (!device) {
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json(device.toJSON());
    }
  })
  .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
}

export const update = async (req, res) => {
  const name = req.params.name
  Device.forge({ name })
  .fetch({ require: true })
  .then((device) => {
    if (!device) {
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json(device.toJSON());
    }
    device.save({
      type: req.body.type || device.get('type'),
      name: req.params.name || device.get('name'),
      ip: req.body.ip || device.get('ip'),
      token: req.body.token || device.get('token')
    })
    .then(() => res.json({error: false, data: {message: 'Device details updated'}}))
    .catch((err)  => res.status(500).json({error: true, data: {message: err.message}}))
  })
  .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
}

export const command = async (req, res) => {
  try {
    const name = req.params.name
    const command = req.params.command
    const d = await Device.forge({ name })
    const deviceInfo = await d.fetch({ require: true })
    const result = await runCommand(deviceInfo.get('type'), command, {
      address: deviceInfo.get('ip'),
      token: deviceInfo.get('token')
    })
  } catch(e) {
    res.status(500).json({error: true, data: {message: "Can't run command on device, error : " + e}})
  }
}


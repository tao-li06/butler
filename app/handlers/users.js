import crypto from 'crypto'
import { User, AuthToken, md5Passowrd } from '../db/models'
import { getDevice, runCommand } from '../devices'
import randomToken from 'random-token'


export const save = async (req, res) => {
    const {
        admin_session, 
        body: {
            name,
            passowrd,
            is_admin,
        }
    } = req
    if (!admin_session) {
        res.status(403).json({ error: true, data: { message: 'Not Authorized' }})
    } else {
        User.forge({
            name,
            passowrd: md5Passowrd(passowrd),
            is_admin
        })
        .save()
        .then((user) => es.json({ error: false, data: { id: user.get('id')}}))
        .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
    }
}

export const token = async (req, res) => {
    const {
        name,
        password
    } = req.body
    User.forge({ name })
        .fetch()
        .then((user) => {
            if (!user || user.get('password') != md5Passowrd(password)) {
                res.status(403).json({error: true, data: { message: 'Not Authorized' }});
            }
            else {
                AuthToken.forge({ user_id: user.get('id')})
                    .fetch()
                    .then((existing_auth_token) => {
                        let auth_token = existing_auth_token;
                        if (!auth_token) {
                            auth_token = randomToken(16)
                            const expiration = new Date()
                            expiration.setDate(expiration.getDate() + 5);
                            return AuthToken.forge({
                                    user_id: user.get('id'),
                                    auth_token,
                                    expire_at: expiration
                                })
                                .save()
                                .then(() => res.json({ token: auth_token}))
                        }
                        return res.json({ token: auth_token})
                    })
            }
        })
        .catch((err) => res.status(500).json({error: true, data: {message: err.message}}))
}



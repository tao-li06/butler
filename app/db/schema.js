const schema = {
    users: {
        id: {
            type: 'increments', 
            nullable: false, 
            primary: true
        },
        name: {
            type: 'string', 
            maxlength: 150, 
            nullable: false
        }
    },
    devices: {
        id: {
            type: 'increments', 
            nullable: false, 
            primary: true
        },
        type: {
            type: 'string',
            nullable: false,
        },
        ip: {
            type: 'string',
            maxlength: 100,
            nullable: false,
        },
        token: {
            type: 'string',
            maxlength: 256,
        }
    },
    auth_tokens: {
        id: {
            type: 'increments', 
            nullable: false, 
            primary: true
        },
        user_id: {
            type: 'integer',
            unique: true,
        },
        auth_token: {
            type: 'string'
        },
        expire_at: {
            type: 'dateTime', 
            nullable: false
        }
    }
};

export default schema
# butler
A service to manage all the smart home device, you can register device to the service and run commands on the devices.
Also you can register the api calls in google action, and you can control the devices through google home or any voice apps.

## Setup
#### Set up Config
App will load some information from `config.yml` in the root folder. It should look like

```
db:
  client: 'mysql'
  connection:
    host     : localhost
    user     : {DB_USER}
    password : {DB_USER_PASSWORD}
    database : {DB_NAME}
    charset  : utf8
```
#### Build
```
npm run build
```

#### Start Service
The service will be up on 3000 after started, and at first time it will initialize the db scehma too.
```
npm run start
```

#### Run in on docker
You can use `build.sh` to build the docker image, then run `start.sh` to run it in a docker container.

## API
NOTE: all the calls excpet `/api/login` requires auth token.
### Users API
#### Get auth token
Get the auth token, and set the token in request header for other api calls.
```
POST /api/login    -d { user: $user, password: $pasword}

{
    token: $token
}
```

#### Create user
```
PUT /api/users     -d { user: $user, password: $password }
```

### Devices API
#### Register device
Register a device, you have to provide a token if that devices requires one.
```
PUT /api/devices/:name     -d { type: $type, ip: $ip, token: $token}
```

#### Get Device
```
GET /api/devices/:name
```

#### Update device
```
POST /api/devices/:name        -d { type: $type, ip: $ip, token: $token}
```


#### Run command on device
```
GET /api/devices/:name/:command
```

#### List all devices
```
GET /api/devices
```
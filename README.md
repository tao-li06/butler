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
#### Init database schema
Run following command to initialize the data schema and default admin user will be set to `root` / `password`
```
npm run init
```

## API
### Users API
#### Get auth token
```
POST /api/login 
```

#### Create user
```
PUT /api/users
```

### Devices API
#### Register device
```
PUT /api/devices/:name
```

#### Get Device
```
GET /api/devices/:name
```

#### Update device
```
POST /api/devices/:name
```

#### Run command on device
```
GET /api/devices/:name/:command
```

####
```
GET /api/devices
```
# butler
Control smart device through google home


### Set up Config
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

#!/bin/bash

name='butler'

[[ $(docker ps -f "name=$name" --format '{{.Names}}') == $name ]] || docker container rm butler

docker run  -d -it -p 3000:3000 --name=butler butler
#!/bin/bash
app="butler"
if docker ps | awk -v app="$app" 'NR > 1 && $NF == app{ret=1; exit} END{exit !ret}'; then
  docker stop "$app" && docker rm -f "$app"
fi
docker run  -d -it -p 3000:3000 --name=butler butler
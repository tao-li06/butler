#!/bin/bash

docker container rm butler && docker run  -d -it -p 3000:3000 --name=butler butler
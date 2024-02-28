#!/bin/bash

source /root/.bashrc
source /root/.nvm/nvm.sh
source /root/tibia/server/.env

nvm install 16
nvm use 16

PORT=2137
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
  echo "Killing process on port $PORT"
  sudo kill -9 $PID
fi

echo "Run Server"
yarn run prod

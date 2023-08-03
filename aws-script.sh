#!/bin/bash

sudo yum install nginx -y
systemctl start nginx
sudo systemctl enable nginx


wget https://github.com/Fabo011/Linky/archive/master.zip
unzip master.zip

cd Linky-master
cd Backend

sudo yum install -y nodejs
npm install
npm run build

cd dist

export JWT_TOKEN=

export DB_USERNAME=postgres
export DB_PASSWORD=
export DB_HOST=
DB_NAME=postgres
export SWAGGER_USER=linky
export SWAGGER_PASSWORD=

npm start --host=0.0.0.0 --port=80
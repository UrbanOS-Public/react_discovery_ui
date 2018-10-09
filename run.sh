#!/bin/bash

cp /usr/share/nginx/html/config.${env}.js /usr/share/nginx/html/config.js
rm /usr/share/nginx/html/config.*.js
nginx -g "daemon off;"

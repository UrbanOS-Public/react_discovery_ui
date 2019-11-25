#!/bin/bash

cat > /usr/share/nginx/html/config.js <<EOL
window.API_HOST = '${API_HOST}'
window.GTM_ID = '${GTM_ID}'
window.BASE_URL = '${BASE_URL}'
window.STREETS_TILE_LAYER_URL = '${STREETS_TILE_LAYER_URL}'
window.MAPBOX_ACCESS_TOKEN = '${MAPBOX_ACCESS_TOKEN}'
window.LOGO_URL = '${LOGO_URL}'
window.AUTH0_DOMAIN = '${AUTH0_DOMAIN}'
window.AUTH0_CLIENT_ID = '${AUTH0_CLIENT_ID}'
window.AUTH0_AUDIENCE = '${AUTH0_AUDIENCE}'
EOL

nginx -g "daemon off;"

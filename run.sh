#!/bin/bash

cat > /usr/share/nginx/html/config.js <<EOL
window.API_HOST = '${API_HOST}'
window.GTM_ID = '${GTM_ID}'
window.BASE_URL = '${BASE_URL}'
window.STREETS_TILE_LAYER_URL = '${STREETS_TILE_LAYER_URL}'
EOL

nginx -g "daemon off;"

#!/usr/bin/env sh
set -eu

sed "s/{\$EXTERNAL_API_SVC}/$EXTERNAL_API_SVC/g" /app/Caddyfile.template > /app/Caddyfile

exec caddy run

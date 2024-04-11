#!/bin/bash
set -e

# Copia os módulos do node apenas se o diretório de módulos do node estiver vazio
if [ ! "$(ls -A /app/node_modules)" ]; then
  echo "Copiando node_modules"
  cp -a /tmp/node_modules/. /app/node_modules/
fi

exec npm start

#!/bin/bash
set -e

# Verifica se o diretório de módulos do Node está vazio
if [ -z "$(ls -A /app/node_modules)" ]; then
  echo "Copiando node_modules"
  cp -a /tmp/node_modules/. /app/node_modules/
fi

exec npm start

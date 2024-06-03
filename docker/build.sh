#!/bin/bash

# Verificar versão do EAS CLI e variáveis de ambiente
eas --version
echo "EXPO_TOKEN: $EXPO_TOKEN"

# Exportar o EXPO_TOKEN para ser usado pelo EAS CLI
export EXPO_TOKEN=$EXPO_TOKEN

# Mudar para o diretório do projeto
cd /app || exit

# Configurar Git para considerar o diretório seguro
git config --global --add safe.directory /app

# Configurar usuário Git
git config --global user.email "arthur.viegas01@edu.pucrs.br"
git config --global user.name "Arthur Viegas"

# Verificar se o git está inicializado
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

# Verificar login (debugging)
echo "chatuba2"
eas whoami

# Verificar se há mudanças e fazer commit
git add .
git commit -m "Prepare for EAS build" || echo "No changes to commit"

# Configurar o projeto para EAS Build (caso necessário)
eas build:configure --platform all

# Construir para Android
eas build --platform android --profile production --non-interactive

# Construir para iOS
eas build --platform ios --profile production --non-interactive

#!/bin/bash

eas --version
echo "EXPO_TOKEN: $EXPO_TOKEN"

export EXPO_TOKEN=$EXPO_TOKEN

cd /app || exit

git config --global --add safe.directory /app

git config --global user.email "arthur.viegas01@edu.pucrs.br"
git config --global user.name "Arthur Viegas"

if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

echo "chatuba2"
eas whoami

git add .
git commit -m "Prepare for EAS build" || echo "No changes to commit"

eas build:configure --platform all

eas build --platform android --profile production --non-interactive

eas build --platform ios --profile production --non-interactive

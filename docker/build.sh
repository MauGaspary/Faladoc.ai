#!/bin/bash

download_aab() {
  BUILD_OUTPUT=$(eas build --platform android --profile production --non-interactive)
  AAB_URL=$(echo "$BUILD_OUTPUT" | grep -oP 'https://expo.dev/artifacts/eas/\S+\.aab')
  if [ -n "$AAB_URL" ]; then
    echo "Baixando AAB de $AAB_URL"
    wget -O app-release.aab "$AAB_URL"
  else
    echo "URL do AAB não encontrada no output do build"
    exit 1
  fi
}

# Se está rodando no EC2
EC2_METADATA_URL="http://169.254.169.254/latest/meta-data/instance-id"
if curl -s --connect-timeout 5 $EC2_METADATA_URL; then
  echo "Rodando no EC2"

  eas --version
  echo "EXPO_TOKEN: $EXPO_TOKEN"
  export EXPO_TOKEN=$EXPO_TOKEN

  git config --global --add safe.directory /app

  # Verifica se o repositório está inicializado (Obrigatório) e commit inicial se necessário
  if [ ! -d ".git" ]; then
    echo "Inicializando repositório Git"
    git init
    git add .
    git commit -m "Initial commit"
  else
    echo "Repositório Git já inicializado"
  fi

  if [ -z "$(git rev-parse HEAD)" ]; then
    echo "Fazendo commit inicial"
    git add .
    git commit -m "Initial commit"
  fi

  echo "Executando expo-doctor"
  if ! npx expo-doctor; then
    echo "Erro: expo-doctor encontrou problemas no projeto"
    echo "Atualizando dependências para versões recomendadas"
    npx expo install
  fi

  eas build:configure --platform all
  if [ $? -ne 0 ]; then
    echo "Erro na configuração do build"
    exit 1
  fi


  # Build para Android
  download_aab
  
  # Descomentar para build para iOS
  # eas build --platform ios --profile production --non-interactive

  # Descomentar para build ios
  # IPA_PATH=$(find ./ -name "*.ipa")

  APK_PATH="/app/build.apk"
  AAB_PATH=$(find ./ -name "*.aab")
  
  if [ -n "$AAB_PATH" ]; then
    echo "Arquivo AAB encontrado: $AAB_PATH"
    wget -O bundletool.jar https://github.com/google/bundletool/releases/download/1.8.2/bundletool-all-1.8.2.jar
    java -jar bundletool.jar build-apks --bundle="$AAB_PATH" --output=output.apks --mode=universal
    unzip output.apks -d output
    mv output/universal.apk $APK_PATH

    echo "Iniciando servidor HTTP para download do APK"
    python3 -m http.server 8081 --directory /app
  else
    echo "Arquivo AAB não encontrado!"
    exit 1
  fi

  # if [ -n "$IPA_PATH" ]; then
  #   echo "Arquivo IPA encontrado: $IPA_PATH"
  #   mv "$IPA_PATH" /app/build.ipa

  #   echo "Iniciando servidor HTTP para download do IPA"
  #   python3 -m http.server 8082 --directory /app
  # else
  #   echo "Arquivo IPA não encontrado!"
  #   exit 1
  # fi

else
  echo "Não está rodando no EC2. Iniciando a aplicação normalmente."
  npm start
fi

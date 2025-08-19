#!/bin/bash

# Script de compilation Liberchat macOS avec DMG
# Usage: ./build-macos.sh

set -e

echo "🚀 Compilation Liberchat macOS v2.0.0"
echo "======================================"

# Vérifier que nous sommes sur macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Ce script doit être exécuté sur macOS"
    exit 1
fi

# Nettoyer les builds précédents
echo "🧹 Nettoyage des builds précédents..."
rm -rf liberchat-darwin-x64/
rm -rf dist/
rm -f *.dmg

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Compiler l'application
echo "⚙️ Compilation de l'application..."
npm run package-mac

# Vérifier que l'app a été créée
if [ ! -d "liberchat-darwin-x64/liberchat.app" ]; then
    echo "❌ Erreur: L'application n'a pas été créée"
    exit 1
fi

echo "✅ Application compilée avec succès"

# Installer create-dmg si nécessaire
if ! command -v create-dmg &> /dev/null; then
    echo "📥 Installation de create-dmg..."
    brew install create-dmg
fi

# Créer le DMG
echo "💿 Création du fichier DMG..."
create-dmg \
  --volname "Liberchat" \
  --volicon "assets/icons/liberchat.icns" \
  --window-pos 200 120 \
  --window-size 600 300 \
  --icon-size 100 \
  --icon "liberchat.app" 175 120 \
  --hide-extension "liberchat.app" \
  --app-drop-link 425 120 \
  "liberchat-macos-v2.0.0.dmg" \
  "liberchat-darwin-x64/"

echo ""
echo "🎉 Compilation terminée avec succès !"
echo "📁 Fichiers générés :"
echo "   • liberchat-darwin-x64/liberchat.app"
echo "   • liberchat-macos-v2.0.0.dmg"
echo ""
echo "📋 Installation :"
echo "   1. Double-cliquez sur liberchat-macos-v2.0.0.dmg"
echo "   2. Glissez Liberchat dans Applications"
echo ""
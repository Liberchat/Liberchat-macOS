#!/bin/bash

echo "🧹 Nettoyage complet avant compilation..."

# Supprimer tous les fichiers de build et cache
rm -rf node_modules/
rm -rf package-lock.json
rm -rf liberchat-darwin-x64/
rm -rf dist/
rm -f *.dmg
rm -f *.zip

echo "📦 Réinstallation des dépendances..."
npm install

echo "⚙️ Compilation de l'application..."
npm run package-mac

echo "✅ Compilation terminée !"
echo "📁 Application générée : liberchat-darwin-x64/liberchat.app"
echo ""
echo "🔍 Vérifications :"
echo "   • Serveur par défaut : https://liberchat.cnt-ait-contact.noho.st/liberchat"
echo "   • Interface splash screen avec thème toggle"
echo "   • Historique des serveurs"
echo ""
echo "🚀 Pour tester : open liberchat-darwin-x64/liberchat.app"
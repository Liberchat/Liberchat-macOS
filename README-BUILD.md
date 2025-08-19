# 🛠️ Compilation Liberchat macOS

## Prérequis

- **macOS** (obligatoire pour créer le DMG)
- **Node.js** et **npm**
- **Homebrew** (pour installer create-dmg)

## 🚀 Compilation rapide

```bash
# Rendre le script exécutable (première fois seulement)
chmod +x build-macos.sh

# Compiler et créer le DMG
./build-macos.sh
```

## 📋 Étapes détaillées

### 1. Installation des outils
```bash
# Installer Homebrew si nécessaire
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer create-dmg
brew install create-dmg
```

### 2. Compilation manuelle
```bash
# Installer les dépendances
npm install

# Compiler l'application
npm run package-mac

# Créer le DMG
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
```

## 📦 Fichiers générés

- `liberchat-darwin-x64/liberchat.app` - Application macOS
- `liberchat-macos-v2.0.0.dmg` - Installateur DMG

## 🔧 Configuration du serveur

Le serveur par défaut est configuré dans :
- `index.html` (ligne 248) : champ input
- `main.js` (ligne 6) : variable selectedServer

## ✅ Test de l'application

```bash
# Lancer l'application compilée
open liberchat-darwin-x64/liberchat.app

# Ou tester le DMG
open liberchat-macos-v2.0.0.dmg
```

---
**Note** : Ce script doit être exécuté sur macOS pour générer le fichier DMG.
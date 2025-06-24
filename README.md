<div align="center">
  <a href="https://github.com/Liberchat/Liberchat">
    <img src="assets/icons/liberchat.icns" alt="Liberchat Logo" width="96" height="96" style="margin-bottom: 10px;" />
  </a>
  
  <h1 style="margin-top: 0;">Liberchat MacOS Desktop</h1>
  
  <a href="https://github.com/Liberchat/Liberchat">Projet principal sur GitHub</a>
  
  <br/>
  
  <img src="https://img.shields.io/badge/Electron-22.x-blue?logo=electron"/>
  <img src="https://img.shields.io/badge/MacOS-compatible-success?logo=apple"/>
  <img src="https://img.shields.io/badge/UI-Modern-red"/>
  <img src="https://img.shields.io/badge/license-MIT-green"/>
  
  <br/>
  <em>Application de messagerie moderne, multiplateforme, basée sur Electron.</em>
</div>

## Fonctionnalités principales
- **Splash screen** stylisé avec choix du serveur
- **Compatibilité micro** (permissions automatiques)
- **Sécurité** : contextIsolation, preload sécurisé
- **Fenêtre principale maximisée, sans barre de menu**
- **Build universel MacOS** : app et DMG

## Installation & Lancement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Générer l’application MacOS (dossier .app)
npm run package-mac

# Générer le fichier DMG (installateur Mac)
npx appdmg dmg.json liberchat-macos.dmg
```

Les fichiers générés se trouvent à la racine du projet :
- `liberchat-darwin-x64/liberchat.app` (application MacOS)
- `liberchat-macos.dmg` (installateur DMG)

## Installation sur MacOS

- **Depuis le DMG** : Ouvre `liberchat-macos.dmg` puis glisse l’icône Liberchat dans le dossier Applications.
- **Depuis le .app** : Copie simplement `liberchat-darwin-x64/liberchat.app` dans ton dossier Applications.

## Configuration du serveur
Au démarrage, saisis l’URL du serveur Liberchat de ton choix dans le splash screen.

## Dépendances principales
- [Electron](https://www.electronjs.org/) ^22.x
- [electron-packager](https://github.com/electron/electron-packager)
- [appdmg](https://github.com/LinusU/node-appdmg)

## Licence
MIT

---
Projet moderne, pensé pour la compatibilité et la simplicité d’utilisation sur MacOS.


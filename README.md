<div align="center">
  <a href="https://github.com/Liberchat/Liberchat">
    <img src="assets/icon.ico" alt="Liberchat Logo" width="96" height="96" style="margin-bottom: 10px;" />
  </a>
  
  <h1 style="margin-top: 0;">Liberchat Linux Desktop</h1>
  
  <a href="https://github.com/Liberchat/Liberchat">Projet principal sur GitHub</a>
  
  <br/>
  
  <img src="https://img.shields.io/badge/Electron-22.x-blue?logo=electron"/>
  <img src="https://img.shields.io/badge/Linux-compatible-success?logo=linux"/>
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
- **Build universel Linux** : AppImage, deb, rpm, snap

## Installation & Lancement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Générer les paquets pour Linux (AppImage, deb, rpm, snap)
npm run build
```

Les fichiers générés se trouvent dans le dossier `dist/`.

## Installation sur Linux

Après compilation (`npm run build`), vous trouverez dans le dossier `dist/` :

- **AppImage** (`.AppImage`) : universel, exécutable sur la plupart des distributions.
  - Rendez le fichier exécutable : `chmod +x Liberchat-*.AppImage`
  - Lancez-le : `./Liberchat-*.AppImage`

- **Debian/Ubuntu** (`.deb`) :
  - Installez avec : `sudo dpkg -i Liberchat-*.deb`
  - Ou double-cliquez sur le fichier dans votre gestionnaire de fichiers.

- **Fedora/RedHat** (`.rpm`) :
  - Installez avec : `sudo rpm -i Liberchat-*.rpm`

- **Snap** (`.snap`) :
  - Installez avec : `sudo snap install --dangerous Liberchat-*.snap`

> **Astuce** : AppImage fonctionne sur la plupart des distributions sans installation système.

## Configuration du serveur
Au démarrage, saisissez l’URL du serveur Liberchat de votre choix dans le splash screen.

## Dépendances principales
- [Electron](https://www.electronjs.org/) ^22.x
- [electron-builder](https://www.electron.build/)

## Licence
MIT

---
Projet moderne, pensé pour la compatibilité et la simplicité d’utilisation sur toutes les distributions Linux.
# Liberchat-Linux
# Liberchat-MacOS
# Liberchat-macOS

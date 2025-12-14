<div align="center">
  <a href="https://github.com/Liberchat/Liberchat">
    <img src="assets/icons/liberchat.png" alt="Liberchat Logo" width="96" height="96" style="margin-bottom: 10px;" />
  </a>
  
  <h1 style="margin-top: 0;">Liberchat MacOS Desktop</h1>
  
  <a href="https://github.com/Liberchat/Liberchat">Projet principal sur GitHub</a>
  
  <br/>
  
  <img src="https://img.shields.io/badge/Electron-22.x-blue?logo=electron"/>
  <img src="https://img.shields.io/badge/MacOS-Natif-success?logo=apple"/>
  <img src="https://img.shields.io/badge/UI-Native-red"/>
  <img src="https://img.shields.io/badge/TouchBar-Support-orange"/>
  <img src="https://img.shields.io/badge/license-MIT-green"/>
  
  <br/>
  <em>Application de messagerie moderne avec fonctionnalités natives macOS exclusives.</em>
</div>

## ✨ Fonctionnalités principales

### Interface moderne
- **Splash screen intelligent** avec sélection de serveur et thème
- **Historique des serveurs** : Sauvegarde des 3 derniers serveurs utilisés
- **Thème adaptatif** : Mode sombre/clair avec sauvegarde des préférences
- **Interface optimisée** : Réduction de la dépendance webview avec améliorations natives

### Sécurité & Performance
- **Sécurité renforcée** : contextIsolation, preload sécurisé
- **Cache intelligent** : Réduction des requêtes réseau
- **Notifications natives** : Intégration système complète
- **Permissions automatiques** : Micro/caméra configurés

## 🍎 Fonctionnalités exclusives macOS

### Interface native
- **Menu macOS complet** avec raccourcis Cmd+ natifs
- **Barre de titre cachée** avec effet vibrancy
- **Fenêtre transparente** intégrée au système
- **Thème système automatique** (suit Dark/Light mode)

### Productivité
- **Icône barre de menu** : Accès rapide et menu contextuel
- **Touch Bar** : Boutons rapides (Nouveau message, Actualiser, Paramètres)
- **Comportement natif** : Fermeture = masquer, réactivation depuis le Dock
- **Raccourcis système** : Cmd+Q, Cmd+W, Cmd+M, Cmd+R, Cmd+,

### Intégration système
- **Notifications macOS** natives avec son et badges
- **Scrollbars natives** avec style macOS
- **Polices système** (-apple-system) pour un rendu parfait
- **Animations fluides** optimisées pour macOS

##  Installation & Lancement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Générer l'application MacOS (dossier .app)
npm run package-mac

# Générer le fichier DMG (installateur Mac)
npx appdmg dmg.json liberchat-macos.dmg
```

### Fichiers générés
- `liberchat-darwin-x64/liberchat.app` (application MacOS)
- `liberchat-macos.dmg` (installateur DMG)

## 📦 Installation sur MacOS

### Méthode recommandée (DMG)
1. Télécharge `liberchat-macos.dmg`
2. Double-clique pour monter l'image disque
3. Glisse l'icône Liberchat dans le dossier Applications
4. Lance depuis le Launchpad ou Applications

### Méthode alternative (.app)
- Copie `liberchat-darwin-x64/liberchat.app` dans `/Applications/`

## ⚙️ Configuration

### Premier lancement
1. **Sélection du serveur** : Choisis ton serveur Liberchat
2. **Thème** : Clique sur 🌙/☀️ pour basculer entre clair/sombre
3. **Historique** : Les serveurs récents apparaîtront automatiquement

### Fonctionnalités avancées
- **Menu barre** : Clique sur l'icône Liberchat dans la barre de menu
- **Touch Bar** : Utilise les boutons rapides (MacBook Pro)
- **Raccourcis** : Cmd+, pour les préférences, Cmd+R pour actualiser

## 🎯 Utilisation

### Sélection rapide de serveur
- **Clic dans le champ URL** → Affiche les serveurs récents
- **Sélection** → Remplit automatiquement le champ
- **Sauvegarde automatique** des 3 derniers serveurs

### Thèmes
- **Bouton toggle** en haut à droite du splash screen
- **Sauvegarde automatique** du choix
- **Thème système** : Suit automatiquement les préférences macOS

### Raccourcis macOS
- `Cmd+Q` : Quitter l'application
- `Cmd+W` : Fermer la fenêtre (masque l'app)
- `Cmd+M` : Réduire dans le Dock
- `Cmd+R` : Recharger la page
- `Cmd+,` : Ouvrir les préférences
- `Cmd+H` : Masquer l'application

##  Dépendances

### Principales
- [Electron](https://www.electronjs.org/) ^22.x
- [electron-packager](https://github.com/electron/electron-packager)
- [appdmg](https://github.com/LinusU/node-appdmg)

### APIs macOS utilisées
- **Tray** : Icône barre de menu
- **TouchBar** : Support MacBook Pro
- **nativeTheme** : Thème système
- **systemPreferences** : Intégration système
- **Menu** : Menus natifs macOS

## 🔧 Développement

### Structure du projet
```
liberchat-macos/
├── main.js              # Processus principal Electron
├── preload.js           # Script de préchargement sécurisé
├── index.html           # Splash screen avec sélecteur
├── assets/              # Icônes et ressources
│   └── icons/
│       ├── liberchat.icns
│       └── liberchat.png
├── package.json         # Configuration npm
└── README-macos.md      # Documentation
```

### Fonctionnalités techniques
- **Processus isolés** : Sécurité maximale
- **IPC sécurisé** : Communication entre processus
- **Cache local** : localStorage pour l'historique
- **Détection plateforme** : Fonctionnalités conditionnelles macOS

## 📋 Changelog

### Version 2.0.0 - Édition macOS Native ✨
**Nouvelles fonctionnalités majeures :**

#### 🍎 Intégration macOS native
- ✅ Menu macOS complet avec raccourcis Cmd+
- ✅ Icône dans la barre de menu avec menu contextuel
- ✅ Support Touch Bar pour MacBook Pro
- ✅ Effet Vibrancy et fenêtre transparente
- ✅ Thème système automatique (Dark/Light mode)

#### 🎨 Interface améliorée
- ✅ Splash screen avec sélecteur de thème (🌙/☀️)
- ✅ Historique des 3 derniers serveurs utilisés
- ✅ Dropdown intelligent sous le champ URL
- ✅ Sauvegarde automatique des préférences

####  Performance & UX
- ✅ Réduction de la dépendance webview
- ✅ Cache intelligent pour les requêtes
- ✅ Notifications natives macOS
- ✅ Scrollbars et polices système natives
- ✅ Comportement natif (fermeture = masquer)

#### 🔧 Améliorations techniques
- ✅ Architecture sécurisée avec processus isolés
- ✅ IPC sécurisé entre processus
- ✅ Gestion d'état locale (localStorage)
- ✅ Détection de plateforme conditionnelle

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter des fonctionnalités macOS

---

<div align="center">
  <strong>Liberchat macOS Desktop v2.0.0</strong><br/>
  <em>Application native avec intégration système complète</em><br/>
  <br/>
  <img src="https://img.shields.io/badge/Version-2.0.0-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/macOS-Native-blue?style=for-the-badge&logo=apple"/>
</div>

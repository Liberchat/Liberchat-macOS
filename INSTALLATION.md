# Installation Liberchat macOS v2.0.0

## 📦 Fichiers générés

✅ **Application compilée** : `liberchat-darwin-x64/liberchat.app`
✅ **Archive de distribution** : `liberchat-macos-v2.0.0.zip`

## 🚀 Installation sur macOS

### Méthode 1 : Archive ZIP (Recommandée)
1. Télécharge `liberchat-macos-v2.0.0.zip`
2. Double-clique pour décompresser l'archive
3. Glisse `liberchat.app` dans le dossier `/Applications/`
4. Lance l'application depuis le Launchpad ou Applications

### Méthode 2 : Application directe
1. Copie le dossier `liberchat-darwin-x64/liberchat.app` 
2. Colle-le dans `/Applications/`
3. Lance l'application

## ⚙️ Configuration

### Premier lancement
- **Serveur par défaut** : `https://liberchat.cnt-ait-contact.noho.st/liberchat`
- **Thème** : Clair/Sombre avec bouton toggle 🌙/☀️
- **Historique** : Sauvegarde automatique des 3 derniers serveurs

### Fonctionnalités macOS natives
- **Menu macOS** : Raccourcis Cmd+ natifs
- **Barre de menu** : Icône avec menu contextuel
- **Touch Bar** : Support MacBook Pro
- **Thème système** : Suit automatiquement Dark/Light mode
- **Notifications** : Intégration système complète

## 🔧 Raccourcis clavier
- `Cmd+Q` : Quitter l'application
- `Cmd+W` : Fermer la fenêtre (masque l'app)
- `Cmd+M` : Réduire dans le Dock
- `Cmd+R` : Recharger la page
- `Cmd+,` : Ouvrir les préférences
- `Cmd+H` : Masquer l'application

## 📋 Informations techniques
- **Version** : 2.0.0
- **Electron** : 37.3.1
- **Architecture** : x64 (Intel Mac)
- **Taille** : ~45 MB (compressé)

## 🛠️ Développement
Pour recompiler l'application :
```bash
npm install
npm run package-mac
zip -r liberchat-macos-v2.0.0.zip liberchat-darwin-x64/
```

---
**Liberchat macOS Desktop v2.0.0** - Application native avec intégration système complète
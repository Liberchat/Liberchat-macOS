# ⚠️ IMPORTANT - Recompilation nécessaire

## 🔄 Les modifications ne sont pas visibles ?

Si les modifications (nouveau serveur, interface, etc.) ne sont pas visibles dans l'application compilée, c'est normal ! Il faut **recompiler l'application** pour que les changements soient pris en compte.

## 🛠️ Recompiler sur macOS

### Méthode automatique (Recommandée)
```bash
# Supprimer l'ancienne compilation
rm -rf liberchat-darwin-x64/

# Recompiler avec le script
./build-macos.sh
```

### Méthode manuelle
```bash
# Supprimer l'ancienne compilation
rm -rf liberchat-darwin-x64/

# Installer les dépendances (si nécessaire)
npm install

# Recompiler l'application
npm run package-mac

# Créer le DMG (optionnel)
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

## ✅ Vérifications après compilation

1. **Serveur par défaut** : `https://liberchat.cnt-ait-contact.noho.st/liberchat`
2. **Interface splash screen** avec sélecteur de thème 🌙/☀️
3. **Historique des serveurs** (dropdown sous le champ URL)
4. **Menu macOS** avec raccourcis Cmd+
5. **Icône barre de menu** (en haut à droite)

## 🐛 Si les modifications ne sont toujours pas visibles

1. Vérifiez que vous lancez la **nouvelle** application compilée
2. Supprimez complètement l'ancienne app : `rm -rf liberchat-darwin-x64/`
3. Recompilez : `npm run package-mac`
4. Testez la nouvelle app : `open liberchat-darwin-x64/liberchat.app`

---
**Note** : L'application compilée est un "snapshot" du code source au moment de la compilation. Toute modification du code source nécessite une recompilation.
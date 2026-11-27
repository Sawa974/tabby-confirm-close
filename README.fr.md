[English](README.md) | Français

# tabby-confirm-close

[![npm](https://img.shields.io/npm/v/tabby-confirm-close)](https://www.npmjs.com/package/tabby-confirm-close)

Plugin pour [Tabby](https://github.com/Eugeny/tabby) qui demande une confirmation avant de fermer
un onglet, quel que soit son type : local, SSH, Telnet, série, réglages.

Une seule boîte s'affiche par action de fermeture et liste les onglets concernés : fermer un
onglet scindé, utiliser « Fermer les autres onglets » ou quitter Tabby ne demande qu'une fois.

La boîte de dialogue suit la langue choisie dans Tabby et reprend ses propres traductions. La
touche Entrée choisit « Annuler », pour éviter une fermeture par réflexe.

Nécessite Tabby 1.0.197 ou plus récent.

## Installation

### Depuis Tabby

Ouvrir **Réglages > Plugins**, chercher `confirm close` et cliquer sur **Installer**, puis
redémarrer Tabby.

Le paquet est publié sur npm :
[tabby-confirm-close](https://www.npmjs.com/package/tabby-confirm-close).

### À la main

1. Télécharger le zip de la dernière version dans les
   [Releases](../../releases).
2. Le décompresser dans le dossier des plugins de Tabby, de façon à obtenir
   `plugins/node_modules/tabby-confirm-close/package.json` :
   - Windows : `%APPDATA%\tabby\plugins\node_modules\`
   - macOS : `~/Library/Application Support/tabby/plugins/node_modules/`
   - Linux : `~/.config/tabby/plugins/node_modules/`
3. Redémarrer Tabby.

Créer le dossier `node_modules` s'il n'existe pas encore.

## Compiler depuis le source

Avec Node.js installé :

```sh
npm install
npm run build
```

Le plugin compilé est écrit dans `dist/`.

## Limites connues

- Sur un onglet local où un processus tourne encore, deux confirmations s'enchaînent : celle du
  plugin, puis celle que Tabby affiche déjà dans ce cas.
- Fermer un seul panneau d'un onglet scindé, ou changer le profil d'un panneau, n'est pas
  confirmé.

## Licence

MIT, voir [LICENSE](LICENSE).

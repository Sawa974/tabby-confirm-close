[English](README.md) | Français

# tabby-confirm-close

Plugin pour [Tabby](https://github.com/Eugeny/tabby) qui demande une confirmation avant de fermer
un onglet terminal : local, SSH, Telnet, série.

La boîte de dialogue propose « Fermer » et « Annuler ». La touche Entrée choisit « Annuler », pour
éviter une fermeture par réflexe.

## Installation

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

Le plugin compilé est écrit dans `dist/`. Pour l'essayer sans l'installer, lancer Tabby avec la
variable `TABBY_PLUGINS` pointant sur le dossier qui contient `tabby-confirm-close`.

## Limite connue

Sur un onglet local où un processus tourne encore, deux confirmations s'enchaînent : celle du
plugin, puis celle que Tabby affiche déjà dans ce cas.

## Licence

MIT, voir [LICENSE](LICENSE).

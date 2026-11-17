English | [Français](README.fr.md)

# tabby-confirm-close

A [Tabby](https://github.com/Eugeny/tabby) plugin that asks for confirmation before closing a
terminal tab: local, SSH, Telnet, serial.

The dialog offers « Fermer » (Close) and « Annuler » (Cancel). Pressing Enter selects Cancel, so a
tab is never closed by reflex. The dialog text is currently in French only.

## Installation

1. Download the zip of the latest version from the [Releases](../../releases).
2. Extract it into Tabby's plugin folder, so that you end up with
   `plugins/node_modules/tabby-confirm-close/package.json`:
   - Windows: `%APPDATA%\tabby\plugins\node_modules\`
   - macOS: `~/Library/Application Support/tabby/plugins/node_modules/`
   - Linux: `~/.config/tabby/plugins/node_modules/`
3. Restart Tabby.

Create the `node_modules` folder if it does not exist yet.

## Building from source

With Node.js installed:

```sh
npm install
npm run build
```

The compiled plugin is written to `dist/`. To try it without installing it, start Tabby with the
`TABBY_PLUGINS` environment variable pointing to the folder that contains `tabby-confirm-close`.

## Known limitation

On a local tab where a process is still running, two confirmations follow each other: the
plugin's, then the one Tabby already shows in that case.

## License

MIT, see [LICENSE](LICENSE).

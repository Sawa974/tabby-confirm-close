English | [Français](README.fr.md)

# tabby-confirm-close

[![npm](https://img.shields.io/npm/v/tabby-confirm-close)](https://www.npmjs.com/package/tabby-confirm-close)

A [Tabby](https://github.com/Eugeny/tabby) plugin that asks for confirmation before closing a
tab, whatever its type: local, SSH, Telnet, serial, settings.

One dialog is shown per closing action, listing the tabs about to close: closing a split tab,
using "Close other tabs" or quitting Tabby asks only once.

The dialog follows Tabby's language setting and reuses Tabby's own translations. Pressing Enter
selects Cancel, so a tab is never closed by reflex.

Requires Tabby 1.0.197 or later.

## Installation

### From Tabby

Open **Settings > Plugins**, search for `confirm close` and click **Install**, then restart Tabby.

The package is published on npm:
[tabby-confirm-close](https://www.npmjs.com/package/tabby-confirm-close).

### Manually

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

The compiled plugin is written to `dist/`.

## Known limitations

- On a local tab where a process is still running, two confirmations follow each other: the
  plugin's, then the one Tabby already shows in that case.
- Closing a single pane of a split tab, or switching a pane's profile, is not confirmed.

## License

MIT, see [LICENSE](LICENSE).

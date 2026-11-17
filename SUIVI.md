# Suivi

Fichier de reprise : où en est le plugin, ce qui a été décidé et pourquoi.

## Fait

- **v0.1.0** publiée : https://github.com/Sawa974/tabby-confirm-close/releases/tag/v0.1.0
- **v0.2.0** publiée sur npm et en Release GitHub : boîte dans la langue de Tabby, `noLink`.
- Release automatique : `.github/workflows/release.yml` se déclenche au push d'un tag `v*`.
- README en anglais (`README.md`, affiché par GitHub) et en français (`README.fr.md`).

## En cours

**Textes de la boîte traduits dans la langue de Tabby.** Le code utilise `TranslateService`,
exporté par `tabby-core`, et réutilise les clés que Tabby traduit déjà dans ses 22 langues :

- message : `Close tab` (« Fermer l'onglet ») ;
- titre de l'onglet dans `detail`, pour ne pas construire de phrase à traduire ;
- boutons : `Close` et `Cancel`.

Types passés en `1.0.197-nightly.1` (Angular 15, rxjs 7) : `npm install` à vide et
`npm run build` passent. Testé dans Tabby 1.0.238 en français, anglais et allemand. Il reste à
faire, la v0.2.0 étant publiée sur npm (https://www.npmjs.com/package/tabby-confirm-close)
et en Release GitHub :

1. Sur npmjs.com, déclarer le Trusted Publisher (GitHub Actions, `release.yml`), puis ajouter au
   workflow `id-token: write`, `registry-url` et `npm publish --provenance`.

## Reste à faire

- **Double confirmation** : sur un onglet local où un processus tourne, la boîte du plugin puis
  celle de Tabby (« "{command}" is still running. Close? ») s'enchaînent.
- **Une confirmation par action, pas par panneau.** Le plugin confirme au niveau du panneau
  terminal, alors que l'utilisateur ferme un onglet ou l'application :
  - fermer Tabby (`AppService.closeAllTabs`) appelle `canClose()` onglet par onglet, d'où une
    confirmation par onglet ouvert ;
  - fermer un onglet scindé (`SplitTabComponent.canClose`) appelle `canClose()` sur tous ses
    panneaux en parallèle (`Promise.all`), d'où plusieurs boîtes empilées.

  À traiter avec la double confirmation, qui a la même cause.
- Vérifier que le plugin apparaît dans Réglages > Plugins de Tabby (recherche `confirm close`) :
  fait sur ARKHAM. Sur GROUPEOMICRONE, une copie manuelle numérotée `1.0.0` bloque la mise à
  jour (le gestionnaire la croit plus récente que la 0.2.0) : Tabby fermé, supprimer
  `%APPDATA%\tabby\plugins\node_modules\tabby-confirm-close`, puis installer depuis le
  gestionnaire.

## Décisions

- **`dist/` hors de git.** Un `dist/` versionné finit par ne plus correspondre au source ; la
  version prête à installer est le zip joint à chaque Release.
- **Versions de `tabby-*` fixées exactement.** `^1.0.0-nightly` retombe sur la 1.0.163, dont les
  peers (Angular 9) entrent en conflit avec les nightlies récentes. Ces versions ne servent qu'aux
  types : l'utilisateur reçoit celles de son propre Tabby.
- **Textes génériques de Tabby plutôt qu'un dictionnaire propre**, pour couvrir toutes les langues
  sans traduction à maintenir.
- **`noLink: true` sur la boîte.** Sous Windows, Electron remplace les libellés anglais standard
  (`Close`, `Cancel`) par les boutons natifs, affichés dans la langue du système : Tabby en
  anglais sur un Windows français montrait « Fermer » et « Annuler ». Les autres langues ne sont
  pas touchées, leurs libellés n'étant pas reconnus. `MessageBoxOptions` de Tabby ne déclare pas
  `noLink`, d'où la variable typée `MessageBoxOptions & { noLink: boolean }`.
- **Identité git locale au dépôt**, avec l'adresse `noreply` de GitHub : le dépôt est public.
- **Licence MIT**, la même que Tabby.

## Prochain pas

Sur GROUPEOMICRONE, remplacer la copie manuelle par l'installation depuis le gestionnaire de
plugins et tester. Ensuite, au choix : configurer le Trusted Publishing npm, ou attaquer la
confirmation unique par action de fermeture.

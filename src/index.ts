import { NgModule } from '@angular/core'
import { AppService, BaseTabComponent, MessageBoxOptions, PlatformService, TranslateService } from 'tabby-core'

// Les types 1.0.197 ne déclarent pas le paramètre ignorePinned de closeTab ni la propriété effectivelyPinned.
type CloseTab = (tab: BaseTabComponent, checkCanClose?: boolean, ignorePinned?: boolean) => Promise<void>
type PinnableTab = BaseTabComponent & { effectivelyPinned?: boolean }

interface PendingClose {
    tab: BaseTabComponent
    ignorePinned?: boolean
    resolve: () => void
    reject: (error: unknown) => void
}

@NgModule({})
export default class ConfirmCloseModule {
    private batch: PendingClose[] | null = null

    constructor (private app: AppService, private platform: PlatformService, private translate: TranslateService) {
        const originalCloseTab = app.closeTab.bind(app) as CloseTab
        const originalCloseAllTabs = app.closeAllTabs.bind(app)

        const closeTab: CloseTab = (tab, checkCanClose, ignorePinned) => {
            // Sans checkCanClose, l'appel vient de restartTab et non de l'utilisateur.
            if (!checkCanClose || !this.willClose(tab, ignorePinned)) {
                return originalCloseTab(tab, checkCanClose, ignorePinned)
            }
            return new Promise<void>((resolve, reject) => {
                if (!this.batch) {
                    this.batch = []
                    // Les fermetures en lot du menu appellent closeTab dans une boucle synchrone : le microtask part après le dernier appel.
                    queueMicrotask(() => this.flush(originalCloseTab))
                }
                this.batch.push({ tab, ignorePinned, resolve, reject })
            })
        }
        app.closeTab = closeTab

        app.closeAllTabs = async (): Promise<boolean> => {
            if (app.tabs.length && !await this.confirm(app.tabs)) {
                return false
            }
            return originalCloseAllTabs()
        }
    }

    private willClose (tab: BaseTabComponent, ignorePinned?: boolean): boolean {
        return this.app.tabs.includes(tab) && (ignorePinned || !(tab as PinnableTab).effectivelyPinned)
    }

    private async flush (originalCloseTab: CloseTab): Promise<void> {
        const batch = this.batch ?? []
        this.batch = null
        try {
            const confirmed = await this.confirm(batch.map(item => item.tab))
            for (const item of batch) {
                if (confirmed) {
                    originalCloseTab(item.tab, true, item.ignorePinned).then(item.resolve, item.reject)
                } else {
                    item.resolve()
                }
            }
        } catch (error) {
            for (const item of batch) {
                item.reject(error)
            }
        }
    }

    private async confirm (tabs: BaseTabComponent[]): Promise<boolean> {
        // Tabby ne traduit aucune clé pour plusieurs onglets : la liste des titres dit ce qui va se fermer.
        const message = this.translate.instant(tabs.length === 1 ? 'Close tab' : 'Close')
        // Sous Windows, Electron remplace les libellés standard (Close, Cancel) par les boutons natifs, dans la langue du système.
        const options: MessageBoxOptions & { noLink: boolean } = {
            type: 'warning',
            message,
            detail: tabs.map(tab => tab.title || 'Terminal').join('\n'),
            buttons: [this.translate.instant('Close'), this.translate.instant('Cancel')],
            defaultId: 1, // Entrée = Annuler, pour éviter les validations réflexes
            cancelId: 1,
            noLink: true,
        }
        const result = await this.platform.showMessageBox(options)
        return result.response === 0
    }
}

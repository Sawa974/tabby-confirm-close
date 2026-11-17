import { Injectable, NgModule } from '@angular/core'
import { PlatformService, TranslateService, MessageBoxOptions } from 'tabby-core'
import { TerminalDecorator } from 'tabby-terminal'

type TerminalTab = Parameters<TerminalDecorator['attach']>[0]

/**
 * Demande une confirmation avant de fermer n'importe quel onglet terminal
 * (local, SSH, Telnet, série...). Tabby appelle tab.canClose() avant chaque
 * fermeture "utilisateur".
 */
@Injectable()
export class ConfirmCloseDecorator extends TerminalDecorator {
    constructor (private platform: PlatformService, private translate: TranslateService) {
        super()
    }

    attach (tab: TerminalTab): void {
        const originalCanClose = tab.canClose.bind(tab)

        tab.canClose = async (): Promise<boolean> => {
            // Sous Windows, Electron remplace les libellés standard (Close, Cancel) par les boutons natifs, dans la langue du système.
            const options: MessageBoxOptions & { noLink: boolean } = {
                type: 'warning',
                message: this.translate.instant('Close tab'),
                detail: tab.title || 'Terminal',
                buttons: [this.translate.instant('Close'), this.translate.instant('Cancel')],
                defaultId: 1, // Entrée = Annuler, pour éviter les validations réflexes
                cancelId: 1,
                noLink: true,
            }
            const result = await this.platform.showMessageBox(options)
            if (result.response !== 0) {
                return false
            }
            // Conserve les vérifications propres à Tabby, comme l'alerte sur un processus encore actif.
            return originalCanClose()
        }
    }
}

@NgModule({
    providers: [
        { provide: TerminalDecorator, useClass: ConfirmCloseDecorator, multi: true },
    ],
})
export default class ConfirmCloseModule { }

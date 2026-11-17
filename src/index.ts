import { Injectable, NgModule } from '@angular/core'
import { PlatformService } from 'tabby-core'
import { TerminalDecorator } from 'tabby-terminal'

type TerminalTab = Parameters<TerminalDecorator['attach']>[0]

/**
 * Demande une confirmation avant de fermer n'importe quel onglet terminal
 * (local, SSH, Telnet, série...). Tabby appelle tab.canClose() avant chaque
 * fermeture "utilisateur".
 */
@Injectable()
export class ConfirmCloseDecorator extends TerminalDecorator {
    constructor (private platform: PlatformService) {
        super()
    }

    attach (tab: TerminalTab): void {
        const originalCanClose = tab.canClose.bind(tab)

        tab.canClose = async (): Promise<boolean> => {
            const result = await this.platform.showMessageBox({
                type: 'warning',
                message: `Fermer l'onglet « ${tab.title || 'Terminal'} » ?`,
                buttons: ['Fermer', 'Annuler'],
                defaultId: 1, // Entrée = Annuler, pour éviter les validations réflexes
                cancelId: 1,
            })
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

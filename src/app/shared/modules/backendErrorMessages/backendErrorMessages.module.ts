import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { BackendErrorMessagesComponent } from './components/backendErrorMessages/backendErrorMessages.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BackendErrorMessagesComponent],
    // експорт необхідний, якщо ми хочемо використовувати компонент ззовні модуля
    // інакше ми не маємо на це права
    exports: [BackendErrorMessagesComponent]
})
export class BackendErrorMessagesModule {}
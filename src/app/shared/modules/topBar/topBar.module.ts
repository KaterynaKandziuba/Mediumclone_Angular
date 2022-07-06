import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopBarComponent } from "./components/topBar.component";
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [TopBarComponent],
    // ми хочемо використовувати компонент поза модулем
    exports: [TopBarComponent]
})
export class TopBarModule {}
import { CommonModule } from "@angular/common";
import { Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FeedTogglerComponent } from "./components/feedToggler.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [FeedTogglerComponent],
    exports: [FeedTogglerComponent]
})
export class FeedTogglerModule{}
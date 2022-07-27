import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TagListModule } from "../tagList/lagList.module";
import { PopularTagsComponent } from "./components/popularTags.component";
import { GetPopularTagsEffect } from "./effects/getPopularTags.effect";
import { reducers } from "./reducers";
import { PopularTagsService } from "./services/popularTags.service";

@NgModule({
    imports: [CommonModule, TagListModule, EffectsModule.forFeature([GetPopularTagsEffect]), StoreModule.forFeature('popularTags', reducers)],
    declarations: [PopularTagsComponent],
    exports: [PopularTagsComponent],
    providers: [PopularTagsService]
})
export class PopularTagsModule{}
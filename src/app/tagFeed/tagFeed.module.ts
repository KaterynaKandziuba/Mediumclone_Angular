import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BannerModule } from "../shared/modules/banner/banner.module";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { FeedTogglerModule } from "../shared/modules/feedToggler/feedToggler.module";
import { PopularTagsModule } from "../shared/modules/popularTags/popularTags.module";
import { TagFeedComponent } from "./component/tagFeed.component";

const routes = [
    // замість слагу може бути будь-яка змінна і ми можемо її прочитати і компоненті
    {
        path: 'tags/:slug',
        component: TagFeedComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeedModule,
        BannerModule,
        PopularTagsModule,
        FeedTogglerModule
    ],
    declarations: [TagFeedComponent]
})
export class TagFeedModule{}
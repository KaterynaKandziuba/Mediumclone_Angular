import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BannerModule } from "../shared/modules/banner/banner.module";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { FeedTogglerModule } from "../shared/modules/feedToggler/feedToggler.module";
import { PopularTagsModule } from "../shared/modules/popularTags/popularTags.module";
import { YourFeedComponent } from "./component/yourFeed.component";

const routes = [
    {
        path: 'feed',
        component: YourFeedComponent
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
    declarations: [YourFeedComponent]
})
export class YourFeedModule{}
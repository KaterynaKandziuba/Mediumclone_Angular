import { Component, Input } from "@angular/core";
import { PopularTagsType } from "src/app/shared/types/popularTags.type";

@Component({
    selector: 'mc-tag-list',
    templateUrl: './tagList.component.html'
})
export class TagListComponent{
    @Input('tags') tagsProps: PopularTagsType[];
}
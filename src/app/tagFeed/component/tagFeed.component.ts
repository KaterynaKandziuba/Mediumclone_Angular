import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'mc-tag-feed',
    templateUrl: './tagFeed.component.html'
})
export class TagFeedComponent implements OnInit{
    apiUrl: string;
    tagName: string;

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        // change to tagName update after clicking on tag
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug']
            this.apiUrl = `/articles?tag=${this.tagName}`
        })
    }
}
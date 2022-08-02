import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getArticleAction } from '../store/actions/getArticle.action';
@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void{
    this.slug = this.route.snapshot.paramMap.get('slug')
    console.log(this.slug)
  }

  fetchData(): void{
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }
}

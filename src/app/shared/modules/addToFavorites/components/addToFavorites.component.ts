import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from '../store/actions/addToFavorites.action';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('articleSlug') articleSlugProps: string;
  @Input('favoritesCount') favoritesCountProps: number;
  favoritesCount: number; // TODO: implement two-way binding
  isFavorited: boolean;
  calls = 0;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  // використовуємо optimistic updates підхід,
  // тобто юзеру ми показуємо, що все гуд, навіть якщо самі не знаємо відповідь сервера
  // тут ми також не чекаємо на позитивну відповідь сервера та не апдейтимо стейт
  handleLike() {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProps,
      })
    );
    this.isFavorited ? (this.favoritesCount -= 1) : (this.favoritesCount += 1);
    this.isFavorited = !this.isFavorited;
  }
}

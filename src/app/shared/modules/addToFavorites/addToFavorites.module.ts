import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesComponent } from './components/addToFavorites.component';
import { addToFavoritesService } from './services/addToFavorites.service';
import { AddToFavoritesEffect } from './store/addToFavorites.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [addToFavoritesService],
})
export class AddToFavoritesModule {}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PersistanceService } from './shared/services/persistance.service';
import { AuthInterceptor } from './auth/shared/services/authInterceptor.service';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
// library helps to create redux actions
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { YourFeedModule } from './yourFeed/yourFeed.module';
import { TagFeedModule } from './tagFeed/tagFeed.module';
import { ArticleModule } from './article/article.module';
import { CreateArticleModule } from './createArticle/createArticle.module';
import { EditArticleModule } from './editArticle/createArticle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // includes CommonModule и ApplicationModule
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // кількість екшенів, які ми хочемо показувати в наших девтулз
      logOnly: environment.production, // лог на продакшині буде тільки рід-онлі
    }),
    TopBarModule,
    HttpClientModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    // ставимо перед ArticleModule, щоб не було колізії зі шляхами
    ArticleModule,
    EditArticleModule,
  ],
  providers: [
    // ніде автоматично не реєструється, тому нам необхідно додавати його в той модуль,
    // де ми його використовуємо - в даному разі інтерсептор всередині app.module
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      // цей запис, щоб показати, що в нас мультипровайдер
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

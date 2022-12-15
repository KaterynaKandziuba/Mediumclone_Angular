import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from '../shared/services/auth.service';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginEffect } from './store/effects/loginEffect';
import { RegisterEffect } from './store/effects/registerEffect';
import { reducer } from './store/reducers';
import { GetCurrentUserEffect } from './store/effects/getCurrentUserEffect';
import { UpdateCurrentUserEffect } from './store/effects/updateCurrentUser.effect';
import { LogoutEffect } from './store/effects/logout.effect';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
      path: 'login',
      component: LoginComponent
  }
];

@NgModule({
  imports: [
    // надає доступ до директив та пайпів
    CommonModule,
    // використовуємо forChild, а не forRoot, коли реєструємо шляхи для внутрішніх модулів
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    // в цьому модулі ефекти оновлюють наш стор
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
    BackendErrorMessagesModule,
  ],
  // adds injectable objects
  providers: [AuthService, PersistanceService],
  // які компоненти ми хочемо зареєструвати
  declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}

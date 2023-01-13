import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { loginAction } from '../../store/actions/login.action';
import { validationErrorsSelector } from '../../store/selectors';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // tracks value + validity of group of form control instances
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select((store: AppStateInterface) => {
        return store.auth.isSubmiting;
      })
    );

    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.backendErrors$.subscribe((errors: BackendErrorsInterface) => {});
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    this.store.dispatch(loginAction({ request: this.form.value }));
  }
}

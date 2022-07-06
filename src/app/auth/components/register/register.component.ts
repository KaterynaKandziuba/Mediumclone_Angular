import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { registerAction } from '../../store/actions/register.action';
import { validationErrorsSelector } from '../../store/selectors';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  // префікс допомагає відрізняти сторонні бібліотеки від наших власних компонентів
  selector: 'mc-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  // tracks value + validity of group of form control instances
  // змінна, де буде знаходитись наша форма
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues()
  }

  initializeValues(): void {
      this.isSubmitting$ = this.store.pipe(select((store: AppStateInterface) => {
          // store.select(isSubmittingSelector)
          return store.auth.isSubmiting;
      }))

      this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
      // group приймає об'єкт з полями нащої групи
      this.form = this.fb.group({
          username: ['', Validators.required],
          email: '',
          password: ''
      })
  }

  onSubmit(): void {
    this.store.dispatch(registerAction({request: this.form.value}))
  }
}

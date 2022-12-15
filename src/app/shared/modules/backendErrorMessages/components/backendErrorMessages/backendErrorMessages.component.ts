import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from '../../../../../auth/types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.html',
})
export class BackendErrorMessagesComponent implements OnInit {
  // input property is binded to DOM property
  // during change detection Ng automatocally updates the data property
  // with the DOM property's value: the same as props in React
  // намагаємся використовувати їх як рідонлі
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  errorMessages: string[];

  ngOnInit(): void {
    if (typeof this.backendErrorsProps === 'string') {
      this.errorMessages = [this.backendErrorsProps];
    } else {
      this.errorMessages = Object.keys(this.backendErrorsProps.errors).map(
        (name: string) => {
          const messages = this.backendErrorsProps.errors[name].join(', ');

          return `${name} ${messages}`;
        }
      );
    }
  }
}

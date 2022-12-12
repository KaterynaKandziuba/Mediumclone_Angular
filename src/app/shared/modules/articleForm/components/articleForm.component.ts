import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorProps: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' '), //  потрібно буде конвертувати в масив, адже для інпута це лише стрінга
    });
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value); // віддаємо дані форми зовнішнім компонентам
  }
}

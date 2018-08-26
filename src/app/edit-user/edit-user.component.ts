import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AppService } from '../app.service';
import { User } from '../user.model';
export const FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM-DD',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY-MM-DD',
  },
};
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ],
})
export class EditUserComponent implements OnInit {
  public user: User = {
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    job: '',
    biography: '',
    is_active: false
  };
  public userForm: FormGroup;
  public isNewUser = true;
  public isFoundUser = true;
  minDate = moment().subtract(100, 'years');
  maxDate = moment().subtract(5, 'years');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isNewUser = false;
        this.getUser(params.id);
      }

      this.formInit(this.user);
    });
  }

  private formInit(user: User) {
    this.userForm = this.fb.group({
      first_name: [user.first_name, [Validators.required, Validators.maxLength(256)]],
      last_name: [user.last_name, [Validators.required, Validators.maxLength(256)]],
      birth_date: [user.birth_date, [Validators.required]],
      gender: [user.gender, [Validators.required]],
      job: [user.job, [Validators.required, Validators.maxLength(256)]],
      biography: [user.biography, [Validators.required, Validators.maxLength(1024)]],
      is_active: [user.is_active]
    });
  }

  private getUser(id) {
    this.service.getUser(id)
      .subscribe((user: User) => {
        this.user = user;
        this.formInit(user);
      }, err => {
        this.toastr.error(err.message);
        this.isFoundUser = false;
        console.log('User not found!');
      });
  }

  public validatorMessages(field) {
    if (!field || !field.errors) {
      return false;
    }

    const errors = [];
    const config = {
      required: 'Поле обязательно для заполнения',
      requiredTrue: 'Value should be positive'
    };

    if (field.errors.hasOwnProperty('minlength')) {
      config['minlength'] = `Минимальное количество символов ${field.errors.minlength.requiredLength}`;
    }

    if (field.errors.hasOwnProperty('maxlength')) {
      config['maxlength'] = `Максимальное количество символов ${field.errors.maxlength.requiredLength}`;
    }

    if (field.errors.hasOwnProperty('matDatepickerMax') || field.errors.hasOwnProperty('matDatepickerMin')) {
      config['matDatepickerMax'] = `Введите корректную дату`;
      config['matDatepickerMin'] = `Введите корректную дату`;
    }

    Object.keys(field.errors).forEach((error: string) => {
      errors.push(config[error]);
    });

    return errors;
  }

  public send() {
    if (this.userForm.invalid) {
      return;
    }

    const data = Object.assign(this.userForm.value);
    data.birth_date = moment(this.userForm.value.birth_date).format('YYYY-MM-DD');

    if (this.isNewUser) {
      this.service.createUser(data)
        .subscribe((user: User) => {
          this.toastr.success(`Пользователь ${user.first_name} ${user.last_name} создан!`);
          this.router.navigate(['']);
        }, err => this.toastr.error(err.message));
    } else {
      this.service.updateUser(this.user.id, data)
        .subscribe((user: User) => {
          this.toastr.success(`Пользователь ${user.first_name} ${user.last_name} обновлен!`);
          this.router.navigate(['user', user.id]);
        }, err => this.toastr.error(err.message));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
  minDate = moment().subtract(100, 'years');
  maxDate = moment().subtract(5, 'years');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService
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

  formInit(user: User) {
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

  getUser(id) {
    this.service.getUser(id)
      .subscribe((user: User) => {
        console.log('Edit: ', user);
        this.user = user;
        this.formInit(user);
      }, err => console.log(err));
  }

  send() {
    console.log(this.userForm);
  }
}

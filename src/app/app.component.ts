import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: AppService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.onRemove
      .subscribe(id => this.remove(id));
  }

  public remove(id) {
    console.log('Remove id: ', id);
    this.service.removeUser(id)
      .subscribe(() => {
        this.toastr.success('Пользователь удален!');
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.toastr.error(err.message);
      });
  }
}

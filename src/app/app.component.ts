import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.onRemove
      .subscribe(id => this.remove(id));
  }

  public remove(id) {
    console.log('Remove id: ', id);
    this.service.removeUser(id)
      .subscribe(() => {
        this.toastr.success('Пользователь удален!');
      }, err => {
        console.log(err);
        this.toastr.error(err.message);
      });
  }
}

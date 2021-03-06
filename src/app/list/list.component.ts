import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public users: User[];
  constructor(private service: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.usersList();
  }

  private usersList() {
    this.service.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      }, err => this.toastr.error(err.message));
  }

  public remove(id) {
    this.service.removeUser(id)
      .subscribe(() => {
        this.toastr.success('Пользователь удален!');
        this.usersList();
      }, err => this.toastr.error(err.message));
  }
}

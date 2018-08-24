import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public users: User[];
  constructor(private service: AppService) { }

  ngOnInit() {
    this.usersList();
  }

  private usersList() {
    this.service.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        console.log('Users: ', users);
      }, err => console.log(err));
  }

  public remove(id) {
    this.service.remove(id);
  }
}

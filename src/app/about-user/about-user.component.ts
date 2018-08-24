import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { User } from '../user.model';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss']
})
export class AboutUserComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute, private service: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUser(params.id);
    });
  }

  getUser(id) {
    this.service.getUser(id)
      .subscribe((user: User) => {
        console.log(user);
        this.user = user;
      }, err => console.log(err));
  }

  public remove(id) {
    this.service.remove(id);
  }
}

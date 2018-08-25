import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUser(params.id);
    });
  }

  getUser(id) {
    this.service.getUser(id)
      .subscribe((user: User) => {
        this.user = user;
      }, err => this.toastr.error(err.message));
  }

  public remove(id) {
    this.service.removeUser(id)
      .subscribe(() => {
        this.toastr.success('Пользователь удален!');
        this.router.navigate(['/']);
      }, err => this.toastr.error(err.message));
  }
}

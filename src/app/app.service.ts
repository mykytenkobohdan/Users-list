import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public onRemove = new Subject<number>();
  private url = 'http://frontend-candidate.dev.sdh.com.ua/v1/contact/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  getUser(userId) {
    return this.http.get(`${this.url}${userId}`);
  }

  remove(id: number) {
    this.onRemove.next(id);
  }

  removeUser(userId) {
    const url = `${this.url}${userId}`;

    return this.http.delete(url);
  }
}

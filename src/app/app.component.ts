import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { User } from './model/user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  users: User[] | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(delay(1000))
      .subscribe((res) => (this.users = res));
  }

  deleteHandler(id: number, buttonRef: MatButton) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(() => {
        if (this.users) {
          this.users = this.users.filter((u) => u.id !== id);
          this.snackBar.open('Item Removed', 'SUCCESS');
        }
      });
  }
}

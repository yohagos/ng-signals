import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

type User = {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  testUser: User = {
    email:'admin@admin.admin', 
    password: 'admin1',
  }

  login(user: User): Observable<boolean> {
    if (
      user.email === this.testUser.email &&
      user.password === this.testUser.password
    ) {
      return of(true);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }
  
}

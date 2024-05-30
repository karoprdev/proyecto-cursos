import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  constructor() {}

  login(email: string, password: string): boolean {
    if (this.userIsValid({ email, password })) {
      this.loggedIn = true;
      sessionStorage.setItem('user', email);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.loggedIn = true;
  }

  public userIsValid(obj: any): boolean {
    this.loggedIn = obj.email == 'karo@gmail.com' && obj.password == '12345';
    return this.loggedIn;
  }

  public ingresarAplicativo(obj: any): boolean {
    this.loggedIn = obj.email == 'karo@gmail.com' && obj.password == '12345';
    return this.loggedIn;
  }
}

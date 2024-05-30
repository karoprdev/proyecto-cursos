import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapse: boolean = false;

  toggleState() {
    let collapse = this.isCollapse;
    this.isCollapse = collapse === false ? true : false;
  }

  constructor(private authService: AuthService, private router: Router) {}

  get loggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  ngOnInit(): void {
    console.log(this.loggedIn);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

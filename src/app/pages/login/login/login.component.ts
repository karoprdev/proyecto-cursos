import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  loggedIn!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public submitForm(): void {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
    const login = this.authService.login(
      this.myForm.value.email,
      this.myForm.value.password
    );
    if (login) {
      this.router.navigate(['/list']);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Usuario o contraseña incorrecta.",
      });
    }
  }

  public get c(): any {
    return this.myForm.controls;
  }
}

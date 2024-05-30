import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/interfaces/country.interface';
import { CountryService } from 'src/app/services/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  public myForm!: FormGroup;
  constructor(
    private service: CountryService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capital: ['', [Validators.required, Validators.minLength(3)]],
      flag: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', [Validators.required]],
      currency: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public get c(): any {
    return this.myForm.controls;
  }

  onSave(item: ICountry): void {
    let data: ICountry = {
      name: item.name,
      capital: item.capital,
      description: item.description,
      flag: item.flag,
      type: item.type,
      currency: item.currency,
    };
    Swal.fire({
      title: '¿Está seguro de crear un nuevo curso?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.saveCountries(data).subscribe((response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado correctamente',
            showConfirmButton: false,
            timer: 1300,
          });
          this.router.navigate(['list']);
        });
      }
    });
  }

  onGoBack(): void {
    this.router.navigate(['/list']);
  }
}

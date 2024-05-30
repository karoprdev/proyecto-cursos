import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { ICountry } from 'src/app/interfaces/country.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  listCountries: any;

  constructor(private router: Router, private service: CountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.service.getCountries()
      .subscribe((response: any)  => {
        this.listCountries = response;
      })
  }

  onGoToEdit(item: ICountry): void {
    const { id } = item;
    this.navigationExtras.state = item;
    this.router.navigate(['/edit', id], this.navigationExtras);
  }
  
  onGoToDetail(item: ICountry): void {
    const { id } = item;
    this.navigationExtras.state = item;
    this.router.navigate(['/detail', id], this.navigationExtras);
  }

  onDelete(item: any): void {
    const { id } = item;

    Swal.fire({
      title: "¿Deseas eliminar este país?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCountries(id)
          .subscribe(response => {
            this.getCountries();
          })
        Swal.fire({
          title: "Eliminado con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from 'src/app/interfaces/country.interface';
import { CountryService } from 'src/app/services/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  country: any;
  countryId!: string | null;

  constructor(private service: CountryService, 
    private router: Router,
    private route: ActivatedRoute) {
      const navigation = this.router.getCurrentNavigation();
      this.country = navigation?.extras?.state;
      this.countryId = this.route.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    if(this.country === undefined) {
      this.router.navigate(['list'])
    }
  }

  onSave(item: ICountry): void {
    let data: ICountry = {
      id: Number(this.countryId),
      name: item.name,
      capital: item.capital,
      description: item.description,
      flag: item.flag,
      type: item.type,
      currency: item.currency,
    }
    this.service.updateCountries(data)
      .subscribe(response => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Guardado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['list'])
      });
  }

  onGoBack(): void {
    this.router.navigate(['/list'] );   
  }

}

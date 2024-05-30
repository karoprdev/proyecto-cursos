import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  API_SOUTH_COUNTRIES: string = environment.API_URL;
  private TOKEN: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`;

  constructor(private httpClient: HttpClient) {}

  getCountries() {
    return this.httpClient.get(`${this.API_SOUTH_COUNTRIES}/countries`);
  }

  saveCountries(data: ICountry) {
    return this.httpClient.post(
      `${this.API_SOUTH_COUNTRIES}/countries`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateCountries(data: ICountry) {
    const { id } = data;
    return this.httpClient.put(
      `${this.API_SOUTH_COUNTRIES}/countries/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  deleteCountries(id: number) {
    return this.httpClient.delete(
      `${this.API_SOUTH_COUNTRIES}/countries/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

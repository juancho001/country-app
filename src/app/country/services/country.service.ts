import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country-intefaces';
import { map, Observable } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // constructor() { }
  private http = inject(HttpClient);

  searchByCapital(search:string):Observable<Country[]>{
    const query = search.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse))
    );
  }

}

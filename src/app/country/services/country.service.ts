import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country-intefaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
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
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      delay(1000),
      catchError(error => {
        console.log('Error Fectching :',error)

        return throwError(()=> new Error('No se encontraron resultados de la busqueda...'))
      })
    );
  }


  searchByCountry(search:string):Observable<Country[]>{
    const query = search.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      delay(1000),
      catchError(error => {
        console.log('Error Fectching :',error)

        return throwError(()=> new Error('No se encontraron resultados de la busqueda...'))
      })
    );
  }



  searchCountryByAlphaCode(code:string){
    const url_AlphaCode = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url_AlphaCode)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      delay(1000),
      map ( countries => countries.at(0)),
      catchError(error => {
        console.log('Error Fectching :',error)

        return throwError(()=> new Error(`No se encontraron resultados de la busqueda por el codigo : ${code}`))
      })
    );
  }

}

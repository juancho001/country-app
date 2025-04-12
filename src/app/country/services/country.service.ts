import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country-intefaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // constructor() { }
  private http = inject(HttpClient);

  private queryCacheByCapital = new Map<string,Country[]>();
  private queryCacheByCountry = new Map<string,Country[]>();
  private queryCacheByRegion = new Map<Region,Country[]>();



  searchByCapital(search:string):Observable<Country[]>{
    const query = search.toLowerCase();

    // TODO: realizamos la verificacion si la busqueda ya existe
    if(this.queryCacheByCapital.has(search)){
      return of (this.queryCacheByCapital.get(search) ?? []);
    }

    console.log(`Haciendo la peticion al servicio por la busqueda ${search}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      tap((countries)=> this.queryCacheByCapital.set(search,countries)),
      delay(1000),
      catchError(error => {
        console.log(`Error Fectching : No se encontro la Capital ${search} >>>>`,error)

        return throwError(()=> new Error('No se encontraron resultados de la busqueda...'))
      })
    );
  }


  searchByCountry(search:string):Observable<Country[]>{
    const query = search.toLowerCase();

      // TODO: realizamos la verificacion si la busqueda ya existe
      if(this.queryCacheByCountry.has(search)){
        return of (this.queryCacheByCountry.get(search) ?? []);
      }

      console.log(`Haciendo la peticion al servicio por la busqueda ${search}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      tap((countries)=> this.queryCacheByCountry.set(search,countries)),
      delay(1000),
      catchError(error => {
        console.log(`Error Fectching : No se encontro el Pais ${search} >>>> `,error)

        return throwError(()=> new Error('No se encontraron resultados de la busqueda...'))
      })
    );
  }



  searchByRegion(search:Region){
    const query = search.toLowerCase();

      // TODO: realizamos la verificacion si la busqueda ya existe
      if(this.queryCacheByRegion.has(search)){
        return of (this.queryCacheByRegion.get(search) ?? []);
      }

      console.log(`Haciendo la peticion al servicio por la busqueda ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`)
    .pipe(
      map( reponse => CountryMapper.mapRestCountryArrayToCountryArray(reponse)),
      tap((countries)=> this.queryCacheByRegion.set(search,countries)),
      delay(1000),
      catchError(error => {
        console.log(`Error Fectching : No se encontro el Pais ${search} >>>> `,error)

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

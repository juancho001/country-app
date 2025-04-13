import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';
  search = signal(this.queryParam);



  // implementando rxResource
  countryResource = rxResource({
    request:()=> ({query:this.search()}),
    loader:({request})=>{
      if(!request.query) return of([])
        this.router.navigate(['/country/by-country'],{
          queryParams:{
            query:request.query
          }
        })
      return this.countryService.searchByCountry(request.query);
    }
  });

  // // Imprementando resource
  // countryResource = resource({
  //   request:()=> ({ query: this.search()}),
  //   loader:async({request})=> {
  //     if(!request.query) return[];

  //     console.log(this.countryService.searchByCountry(request.query))

  //     return await firstValueFrom(this.countryService.searchByCountry(request.query))
  //   }
  // })


 }

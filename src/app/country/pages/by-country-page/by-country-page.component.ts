import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);

  search = signal('');

  countryResource = resource({
    request:()=> ({ query: this.search()}),
    loader:async({request})=> {
      if(!request.query) return[];

      console.log(this.countryService.searchByCountry(request.query))

      return await firstValueFrom(this.countryService.searchByCountry(request.query))
    }
  })


 }

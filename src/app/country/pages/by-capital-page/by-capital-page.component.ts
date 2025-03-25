import { CountryService } from './../../services/country.service';
import { Component, inject, resource, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent,CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  search = signal('');

  //Implementación con rsResources
  countryResource = rxResource({
    request: ()=> ({query:this.search()}),
    loader:({request}) => {
      if (! request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    }

  })



  // Implementación con Resources
  // countryResource = resource({
  //   request:()=> ({ query: this.search()}),
  //   loader:async({request})=> {
  //     if(!request.query) return[];

  //     return await firstValueFrom(this.countryService.searchByCapital(request.query))
  //   }
  // })

// TODO: Se comenta para realizar la implementación de Async con Resources

// hasError = signal<string | null>(null);
// isLoading = signal(false);
// searchCapital = signal<Country[]>([]);


  // onSearch(search: string) {
  //   if (this.isLoading()) {
  //     return;
  //   } else {
  //     this.isLoading.set(true);
  //     this.hasError.set(null);
  //   }

  //   this.countryService.searchByCapital(search).subscribe(
  //     {
  //       next:(response) => {
  //         this.isLoading.set(false);
  //         this.searchCapital.set(response);
  //         console.log(response);
  //       },
  //       error:(err)=>{
  //         this.isLoading.set(false);
  //         this.searchCapital.set([]);
  //         this.hasError.set(err)
  //       }
  //     }
  //   );
  // }
}

// response => {
//   this.isLoading.set(false);
//   this.searchCapital.set(response);
//   console.log(response);

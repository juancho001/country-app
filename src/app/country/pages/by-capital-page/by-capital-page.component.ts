import { CountryService } from './../../services/country.service';
import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  isLoading = signal(false);
  hasError = signal<string | null>(null);
  countryService = inject(CountryService);
  searchCapital = signal<Country[]>([]);


  onSearch(search: string) {
    if (this.isLoading()) {
      return;
    } else {
      this.isLoading.set(true);
      this.hasError.set(null);
    }

    this.countryService.searchByCapital(search).subscribe(response => {
      this.isLoading.set(false);
      this.searchCapital.set(response);
      console.log(response);
    });
  }
}


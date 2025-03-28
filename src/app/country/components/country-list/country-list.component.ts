import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  capital = input.required<Country[]>();
}

import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  capital = input.required<Country[]>();
}

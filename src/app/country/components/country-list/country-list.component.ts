import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe,RouterLink],
  templateUrl: './country-list.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  capital = input.required<Country[]>();
}

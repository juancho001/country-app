import { DecimalPipe } from '@angular/common';
import { Country } from './../../../interfaces/country.interface';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {

  country = input.required<Country>();

  currentYear = computed(()=>{
    return new Date().getFullYear();
  })

}

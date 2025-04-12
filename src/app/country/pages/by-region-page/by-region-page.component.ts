import { CountryService } from './../../services/country.service';
import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ]

  selectedRegion = signal<Region|null>(null);

    // implementando rxResource
    countryResource = rxResource({
      request:()=> ({query:this.selectedRegion()}),
      loader:({request})=>{
        console.log({request})
        if(!request.query) return of([])
        return this.countryService.searchByRegion(request.query);
      }
    });

 }

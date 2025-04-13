import { CountryService } from './../../services/country.service';
import { Component, inject, input, linkedSignal, output, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = (this.activateRoute.snapshot.queryParamMap.get('query') ?? '') as Region;

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ]

  selectedRegion = linkedSignal<Region|null>( ()=> this.queryParam ?? 'Americas');




    // implementando rxResource
    countryResource = rxResource({
      request:()=> ({query:this.selectedRegion()}),
      loader:({request})=>{
        console.log({request})
        if(!request.query) return of([])
          this.router.navigate(['/country/by-region'],{
            queryParams:{
              query:request.query
            }
          })
        return this.countryService.searchByRegion(request.query);
      }
    });

 }

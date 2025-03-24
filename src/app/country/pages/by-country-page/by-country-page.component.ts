import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent],
  templateUrl: './by-country-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

  onSearch(search:string){
    console.log({search});
  }

 }

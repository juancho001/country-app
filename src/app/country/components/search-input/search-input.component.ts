import { Component, input, output } from '@angular/core';

@Component({
  selector: 'county-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  value = output<string>();
  placeholder = input('Search');

}

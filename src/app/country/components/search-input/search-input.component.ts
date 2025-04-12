import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'county-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  value = output<string>();
  inputValue = signal<string>('');
  placeholder = input('Search');
  debounceTime = input(300);

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue(); // cada vez que se actualice la señal el effect detecta el cambio y se dispara

    const timeout = setTimeout(()=>{
      this.value.emit(value);
    },this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout);
    });

  })

}

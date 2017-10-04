import { Component, EventEmitter, ViewChild } from '@angular/core';

import template from './filters.template.html';
import style from './filters.style.scss';

@Component({
  selector: 'filters',
  template,
  styles: [style],
  outputs: ['textFilter'],
  queries: {
    textFilterEl: new ViewChild('textFilter')
  }
})

export class FiltersComponent {
  constructor(){
    this.favorites = false;
    this.editingTextFilter = false;
    this.textFilter = new EventEmitter();
    this.doneEditing = new EventEmitter().debounceTime(350);
    this.doneEditing.subscribe( () => {
      this.editingTextFilter = false;
    })
  }

  ngOnChanges( changes ){
    if( !this.editingTextFilter ) {
      this.textFilterEl.nativeElement.value = changes.searchString ? changes.searchString.currentValue : '';
    }
  }

  onTextFilterChange( val ){
    this.editingTextFilter = true;
    this.doneEditing.next();
    console.log( val );
    this.textFilter
      .debounceTime(300)
      .distinctUntilChanged()
      .next( val );
  }

  clearTextFilter(){
    this.textFilterEl.nativeElement.value = '';
    this.onTextFilterChange('');
  }
}
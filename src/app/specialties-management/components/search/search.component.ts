import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'be-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();

  searchEvent($event) {
    this.search.emit($event.target.value);
  }

  showNew() {
    if (window.location.host === 'localhost:4200') {
      return true;
    }
    return false;
  }
}

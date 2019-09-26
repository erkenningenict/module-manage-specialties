import { Component, Input, OnChanges } from '@angular/core';
import { IHistoryItem } from '../../../shared/utils';
import { ParserService } from '../../../services/parser.service';

@Component({
  selector: 'be-question-history',
  templateUrl: './question-history.component.html',
})
export class QuestionHistoryComponent implements OnChanges {
  @Input() data: string;
  @Input() dataField: string;

  buttonAllText: string;
  showLast: boolean;
  showAll: boolean;
  historyItems: IHistoryItem[];
  allHistoryItems: IHistoryItem[];

  constructor(public parserService: ParserService) {}

  ngOnChanges() {
    const allItems = this.parserService.parseHistoryItems(this.data);
    this.allHistoryItems = allItems.historyItems;
    this.historyItems = this.allHistoryItems.slice(-1);
  }

  onShowAll() {
    this.showAll = !this.showAll;
    this.setButtonText();

    if (this.showLast && !this.showAll) {
      this.showLast = false;
    }
    this.historyItems = this.allHistoryItems;
  }

  onShowLast() {
    this.setButtonText();
    this.showLast = !this.showLast;

    if (this.showAll && !this.showLast) {
      this.showAll = false;
    }
    this.historyItems = this.allHistoryItems.slice(-1);
  }

  setButtonText() {
    if (this.showLast) {
      this.buttonAllText = 'Verberg';
    } else {
      this.buttonAllText = 'Toon';
    }
  }
}

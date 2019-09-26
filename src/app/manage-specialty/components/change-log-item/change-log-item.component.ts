import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { IHistoryObject } from '../../models/manage-specialty';
import {
  capitalizeFirstLetter,
  questionsControlsMap,
} from '../../../shared/utils';

@Component({
  selector: 'be-change-log-item',
  templateUrl: './change-log-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLogItemComponent implements OnInit, OnChanges {
  @Input() changeLogItem: IHistoryObject;

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {}

  getCommentName(commentId) {
    return capitalizeFirstLetter(questionsControlsMap[commentId]);
  }

  getFieldFormatted(field) {
    return capitalizeFirstLetter(
      field
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase(),
    );
  }
}

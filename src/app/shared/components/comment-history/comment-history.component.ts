import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'be-comment-history',
  templateUrl: './comment-history.component.html',
  styleUrls: ['./comment-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentHistoryComponent implements OnChanges {
  @Input() questionTitle: string;
  @Input() questionId: string;
  @Input() showComments: boolean;
  @Input() discussions: IComment[];
  @Input() showAllComments = false;

  buttonAllText: string;
  showAll: boolean;
  showLast = true;
  comments: IComment[];
  allComments: IComment[];

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.comments = [];
    if (this.discussions) {
      this.allComments = this.discussions[`Commentaren${this.questionId}`];
      if (this.allComments) {
        if (this.showAllComments) {
          this.onShowAll();
        } else {
          this.comments = this.allComments.slice(-1);
        }
      }
    }
  }

  onShowAll() {
    this.showAll = !this.showAll;
    this.setButtonText();

    if (this.showLast && !this.showAll) {
      this.showLast = false;
    }
    this.comments = this.allComments;
  }

  onShowLast() {
    this.setButtonText();
    this.showLast = !this.showLast;

    if (this.showAll && !this.showLast) {
      this.showAll = false;
    }
    this.comments = this.allComments.slice(-1);
  }

  setButtonText() {
    if (this.showLast) {
      this.buttonAllText = 'Verberg';
    } else {
      this.buttonAllText = 'Toon';
    }
  }
}

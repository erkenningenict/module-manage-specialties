import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  IDoelstellingItems,
  IGGItems,
  IManageSpecialty,
} from '../../../manage-specialty/models/manage-specialty';
import {
  parserHelper,
  parseSpecialItems,
  returnNewCommentKey,
  tryParseJSON,
} from '../../../shared/utils';

@Component({
  selector: 'be-print-discussion',
  templateUrl: './print-discussion.component.html',
})
export class PrintDiscussionComponent implements OnInit, OnChanges {
  @Input() data: IManageSpecialty;

  discussions: any;
  showComments = false;
  constructor() {}

  ngOnChanges() {
    this.processDiscussions();
  }

  ngOnInit() {}
  processDiscussions() {
    if (!this.data.hasOwnProperty('Discussies')) {
      return;
    }
    // if (this.data.Discussies.length === 0) {
    //   return;
    // }

    const commentaren = [];

    // Verwerk elke datum/commentaar db record
    if (this.data.Discussies !== null) {
      this.data.Discussies.map((commentObject) => {
        let commentaarObject = tryParseJSON(commentObject.Commentaar);
        if (commentaarObject === false) {
          // Legacy discussie, zet in algemeen discussie.

          const commentaar = {
            Commentaar: commentObject.Commentaar.replace('\n', '<br />'),
            Auteur: commentObject.Auteur,
            Bron: commentObject.Bron,
            DatumTijd: commentObject.DatumTijd,
          };
          if (commentaren['CommentarenAlgemeen'] === undefined) {
            commentaren['CommentarenAlgemeen'] = [];
            commentaren['CommentarenAlgemeen'].push(commentaar);
          } else {
            commentaren['CommentarenAlgemeen'].push(commentaar);
          }
        } else {
          commentaarObject = tryParseJSON(commentObject.Commentaar);

          // Commentaarveld bevat de commentaren per onderwerp
          Object.keys(commentaarObject).map((commentKey) => {
            if (
              commentaarObject[commentKey] !== undefined &&
              commentaarObject[commentKey].length !== 0
            ) {
              const comment = commentaarObject[commentKey];
              const newKey = returnNewCommentKey(commentKey);

              const commentaar = {
                Commentaar: comment.replace(/\n/g, '<br />'),
                Auteur: commentObject.Auteur,
                Bron: commentObject.Bron,
                DatumTijd: commentObject.DatumTijd,
              };

              if (commentaren['Commentaren' + newKey] === undefined) {
                commentaren['Commentaren' + newKey] = [];
                commentaren['Commentaren' + newKey].push(commentaar);
              } else {
                commentaren['Commentaren' + newKey].push(commentaar);
              }
            }
          });
        }
      });
      this.discussions = commentaren;
    }
  }
}

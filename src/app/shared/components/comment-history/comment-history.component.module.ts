import { NgModule } from '@angular/core';

import { CommentHistoryComponent } from './comment-history.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [CommentHistoryComponent],
  exports: [CommentHistoryComponent],
  providers: [CommentHistoryComponent],
})
export class CommentHistoryComponentModule {}

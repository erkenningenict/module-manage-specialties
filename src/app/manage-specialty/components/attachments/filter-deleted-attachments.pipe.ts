import { Pipe, PipeTransform } from '@angular/core';
import { IBijlagenDataExtend } from '../../models/manage-specialty';

@Pipe({
  name: 'filterDeletedAttachments',
})
export class FilterDeletedAttachmentsPipe implements PipeTransform {
  transform(items: IBijlagenDataExtend[]): IBijlagenDataExtend[] {
    if (!items) {
      return items;
    }
    return items.filter((item: IBijlagenDataExtend) => item.Status !== 3);
  }
}

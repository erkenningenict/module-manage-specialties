import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenateList',
})
export class ConcatenateListPipe implements PipeTransform {
  transform(value: string[] | string): string {
    const filtered = value && Array.isArray(value) && value.filter(Boolean);
    if (!filtered) {
      return value.toString();
    }
    return filtered.length > 1
      ? `${filtered.slice(0, -1).join(', ')} en ${filtered.slice(-1).pop()}`
      : filtered[0] || '';
  }
}

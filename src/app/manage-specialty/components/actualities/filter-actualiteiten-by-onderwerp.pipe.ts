import { Pipe, PipeTransform } from '@angular/core';
import { IActualiteit } from '../../models/lists';

@Pipe({
  name: 'filterActualiteitenByOnderwerp',
})
export class FilterActualiteitenByOnderwerpPipe implements PipeTransform {
  transform(items: IActualiteit[], onderwerp: string): any {
    if (!items || !onderwerp) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items
      .filter((item) => item.Onderwerp === onderwerp)
      .map((actualiteit: IActualiteit) => ({
        link: actualiteit.Link,
        omschrijving: actualiteit.Omschrijving,
      }))
      .filter((elem, pos, arr) => {
        return (
          arr.indexOf(elem) ===
          arr
            .map((item) => {
              return item.omschrijving;
            })
            .indexOf(elem.omschrijving)
        );
      });
  }
}

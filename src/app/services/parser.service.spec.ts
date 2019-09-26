import { TestBed } from '@angular/core/testing';

import { ParserService } from './parser.service';
import { CurrentDataService } from './current-data.service';
import { State } from '../manage-specialty/store/reducers/manage-specialty.reducer';

describe('ParserService', () => {
  let currentDataService: CurrentDataService;
  let parserService: ParserService;
  const currentDate = new Date('2018-01-01T12:00:00Z');
  const userName = 'UserName';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParserService, CurrentDataService],
    });
    parserService = TestBed.get(ParserService);
    currentDataService = TestBed.get(CurrentDataService);
    currentDataService.setCurrentDate(currentDate);
    currentDataService.setUserName(userName);
  });

  it('should compile parserService', () => {
    expect(parserService).toBeTruthy();
  });

  describe('parseHistoryItems()', () => {
    it('should parse an empty string', () => {
      const input = '';

      const result = parserService.parseHistoryItems(input);
      const expected = {
        currentItem: { text: '', by: userName, date: currentDate },
        historyItems: [],
      };
      expect(result).toEqual(expected);
    });

    it('should parse an history item with a single entry', () => {
      const input =
        '[{"text":"test","date":"2017-11-09T13:25:01.176Z","by":"Name"}]';

      const result = parserService.parseHistoryItems(input);
      const expected = {
        currentItem: {
          text: 'test',
          by: 'Name',
          date: '2017-11-09T13:25:01.176Z',
        },
        historyItems: [
          { text: 'test', date: '2017-11-09T13:25:01.176Z', by: 'Name' },
        ],
      };
      expect(result).toEqual(expected);
    });

    it('should parse an history item with multiple entries', () => {
      const input =
        '[{"text":"test","date":"2017-11-09T13:25:01.176Z","by":"Name"},{"text":"test2","date":"2017-11-09T13:25:01.176Z","by":"Name2"}]';

      const result = parserService.parseHistoryItems(input);
      const expected = {
        currentItem: {
          text: 'test2',
          by: 'Name2',
          date: '2017-11-09T13:25:01.176Z',
        },
        historyItems: [
          { text: 'test', date: '2017-11-09T13:25:01.176Z', by: 'Name' },
          { text: 'test2', date: '2017-11-09T13:25:01.176Z', by: 'Name2' },
        ],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('processSpecialItems()', () => {
    it('should return titel data', () => {});
  });

  // describe('getDataFromFormValue()', () => {
  //   it('should return titel data', () => {
  //     const formValue = {
  //       Commentaar01Form: {
  //         Commentaar01: 'comment text 01',
  //       },
  //       DatatitelForm: {
  //         titel: 'New Title',
  //       },
  //     };
  //     const specialtyInput = {
  //       data: {
  //         Titel: 'Title',
  //         TitelData:
  //           '[{"text":"Title","date":"2017-11-09T13:25:01.176Z","by":"Even, S."}]',
  //         CurrentUserName: 'Test',
  //       },
  //     } as State;
  //     const result = parserService.getDataFromFormValue(
  //       formValue,
  //       specialtyInput,
  //     );
  //     const expected = {
  //       Titel: 'New Title',
  //       TitelData:
  //         '[{"text":"Title","date":"2017-11-09T13:25:01.176Z","by":"Even, S."}' +
  //         ',{"text":"New Title","date":"2018-01-01T12:00:00.000Z","by":"UserName"}]',
  //       CurrentUserName: 'Test',
  //       GeintegreerdeGewasbeschermingData: '{}',
  //       DoelstellingData: '{}',
  //     };
  //     expect(result).toEqual(expected);
  //   });

  //   it('should return other data', () => {
  //     const formValue = {
  //       Commentaar01Form: {
  //         Commentaar01: 'comment text 01',
  //       },
  //       DatainhoudForm: {
  //         inhoud: 'New',
  //       },
  //     };
  //     const specialtyInput = {
  //       data: {
  //         Inhoud:
  //           '[{"text":"Inhoud","date":"2017-11-09T13:25:01.176Z","by":"Even, S."}]',
  //         CurrentUserName: 'Test',
  //       },
  //     } as State;
  //     const result = parserService.getDataFromFormValue(
  //       formValue,
  //       specialtyInput,
  //     );
  //     const expected = {
  //       Inhoud:
  //         '[{"text":"Inhoud","date":"2017-11-09T13:25:01.176Z","by":"Even, S."}' +
  //         ',{"text":"New","date":"2018-01-01T12:00:00.000Z","by":"UserName"}]',
  //       CurrentUserName: 'Test',
  //       GeintegreerdeGewasbeschermingData: '{}',
  //       DoelstellingData: '{}',
  //     };
  //     expect(result).toEqual(expected);
  //   });

  //   it('should not add an item if the text is unchanged', () => {
  //     const formValue = {
  //       Commentaar01Form: {
  //         Commentaar01: 'comment text 01',
  //       },
  //       DatageintegreerdeGewasbeschermingForm: {
  //         geintegreerdeGewasbescherming: 'GG.',
  //       },
  //       CurrentUserName: 'Test',
  //     };
  //     const specialtyInput = {
  //       data: {
  //         GeintegreerdeGewasbeschermingData:
  //           '{"GeintegreerdeGewasbescherming":"[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"PreventieveMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Preventieve maatregelen .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"TeelttechnischeMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"WaarschuwingEnAdviesSystemen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Waarschuwingssystemen .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"NietChemischeMogelijkheden":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"ChemischeGewasbescherming":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Door emissiebeperkende .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"EmissieBeperking":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Door  emissiebeperkende technieken .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}]"}',
  //       },
  //       ggItems: {
  //         GeintegreerdeGewasbescherming:
  //           '[{"text": "GG.","date": "2015-10-29T12:31:12.840Z","by": "Even, S."}]',
  //         PreventieveMaatregelen:
  //           '[{"text": "Geen gegevens", "date": "2015-10-29T12:31:12.840Z", "by": "Even, S."},{"text": "Preventieve maatregelen.","date": "2015-10-29T13:41:03.521Z","by": "Even, S."}]',
  //       },
  //     } as State;
  //     const result = parserService.getDataFromFormValue(
  //       formValue,
  //       specialtyInput,
  //     );
  //     const expected = {
  //       GeintegreerdeGewasbeschermingData:
  //         '{' +
  //         '"GeintegreerdeGewasbescherming":[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}]' +
  //         ',"PreventieveMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Preventieve maatregelen.","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}]' +
  //         '}',
  //       DoelstellingData: '{}',
  //     };
  //     expect(result).toEqual(expected);
  //   });

  //   it('should parse an geintegreerdeGewasbescherming history item with multiple entries', () => {
  //     const formValue = {
  //       Commentaar01Form: {
  //         Commentaar01: 'comment text 01',
  //       },
  //       DatageintegreerdeGewasbeschermingForm: {
  //         geintegreerdeGewasbescherming: 'GGtest.',
  //       },
  //       CurrentUserName: 'Test',
  //     };
  //     const specialtyInput = {
  //       data: {
  //         GeintegreerdeGewasbeschermingData:
  //           '{"GeintegreerdeGewasbescherming":"[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"PreventieveMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Preventieve maatregelen .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"TeelttechnischeMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"WaarschuwingEnAdviesSystemen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Waarschuwingssystemen .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"NietChemischeMogelijkheden":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}],"ChemischeGewasbescherming":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Door emissiebeperkende .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}],"EmissieBeperking":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Door  emissiebeperkende technieken .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}]"}',
  //       },
  //       ggItems: {
  //         GeintegreerdeGewasbescherming:
  //           '[{"text": "GG.","date": "2015-10-29T12:31:12.840Z","by": "Even, S."}]',
  //         PreventieveMaatregelen:
  //           '[{"text": "Geen gegevens","date": "2015-10-29T12:31:12.840Z","by": "Even, S."},{"text": "Preventieve maatregelen .","date": "2015-10-29T13:41:03.521Z","by": "Even, S."}]',
  //       },
  //     } as State;
  //     const result = parserService.getDataFromFormValue(
  //       formValue,
  //       specialtyInput,
  //     );
  //     const expected = {
  //       GeintegreerdeGewasbeschermingData:
  //         '{' +
  //         '"GeintegreerdeGewasbescherming":[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"GGtest.","date":"2018-01-01T12:00:00.000Z","by":"UserName"}]' +
  //         ',"PreventieveMaatregelen":[{"text":"Geen gegevens","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Preventieve maatregelen .","date":"2015-10-29T13:41:03.521Z","by":"Even, S."}]' +
  //         '}',
  //       DoelstellingData: '{}',
  //     };
  //     expect(result).toEqual(expected);
  //   });

  //   it('should parse an doelstelling history item with multiple entries', () => {
  //     const formValue = {
  //       Commentaar01Form: {
  //         Commentaar01: 'comment text 01',
  //       },
  //       DatadoelstellingForm: {
  //         doelstelling: 'Doelstelling Test',
  //       },
  //       CurrentUserName: 'Test',
  //     };
  //     const specialtyInput = {
  //       data: {
  //         DoelstellingData:
  //           '{"DoelstellingData":"[{"text":"Doelstelling","date":"2015-10-29T12:31:12.840Z","by":"Even, S."}]"}',
  //       },
  //       doelstellingItems: {
  //         Doelstelling:
  //           '[{"text": "Doelstelling","date": "2015-10-29T12:31:12.840Z","by": "Even, S."}]',
  //       },
  //     } as State;
  //     const result = parserService.getDataFromFormValue(
  //       formValue,
  //       specialtyInput,
  //     );
  //     const expected = {
  //       DoelstellingData:
  //         '{' +
  //         '"Doelstelling":[{"text":"Doelstelling","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Doelstelling Test","date":"2018-01-01T12:00:00.000Z","by":"UserName"}]' +
  //         '}',
  //       GeintegreerdeGewasbeschermingData: '{}',
  //     };
  //     expect(result).toEqual(expected);
  //   });
  // });
});

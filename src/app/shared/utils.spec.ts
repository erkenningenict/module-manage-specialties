import {
  getCommentListFromFormValue,
  parseSpecialItems,
  tryParseJSON,
} from './utils';
import {
  IDoelstellingItems,
  IManageSpecialty,
} from '../manage-specialty/models/manage-specialty';

describe('Utils', () => {
  describe('tryParseJson()', () => {
    it('should return false for null', () => {
      const input = null;
      const result = tryParseJSON(input);
      expect(result).toEqual(false);
    });

    it('should return false for undefined', () => {
      const input = undefined;
      const result = tryParseJSON(input);
      expect(result).toEqual(false);
    });

    it('should return false for empty string', () => {
      const input = '';
      const result = tryParseJSON(input);
      expect(result).toEqual(false);
    });

    it('should return false for non empty string', () => {
      const input = 'stringValue';
      const result = tryParseJSON(input);
      expect(result).toEqual(false);
    });

    it('should return the parsed json for a json string containing an object', () => {
      const input = '{"obj": "value"}';
      const result = tryParseJSON(input);
      expect(result).toEqual({ obj: 'value' });
    });

    it('should return the json for a json string containing an array', () => {
      const input = '[{"obj": "value"}]';
      const result = tryParseJSON(input);
      expect(result).toEqual([{ obj: 'value' }]);
    });

    it('should return false fo an incorrect json string', () => {
      const input = '[{"obj: "value"}]';
      const result = tryParseJSON(input);
      expect(result).toEqual(false);
    });
  });

  describe('getCommentListFromFormValue()', () => {
    it('should return null if no formValue is found', () => {
      const result = getCommentListFromFormValue(undefined);
      expect(result).toEqual(null);
    });

    it('should return null when no comments are added', () => {
      const formValue = {
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      expect(result).toBeNull();
    });

    it('should not return a value for empty text', () => {
      const formValue = {
        Commentaar01Form: {
          Commentaar01: '',
        },
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      const expected = null;
      expect(result).toEqual(expected);
    });

    it('should return a single comment object for just one', () => {
      const formValue = {
        Commentaar01Form: {
          Commentaar01: 'comment text 01',
        },
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      const expected = '{"01":"comment text 01"}';
      expect(result).toEqual(expected);
    });

    it('should return multiple comments for multiple', () => {
      const formValue = {
        Commentaar01Form: {
          Commentaar01: 'comment text 01',
        },
        Commentaar02Form: {
          Commentaar02: 'comment text 02',
        },
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      const expected = '{"01":"comment text 01","02":"comment text 02"}';
      expect(result).toEqual(expected);
    });

    it('should return a single comement if only one of multiple exists', () => {
      const formValue = {
        Commentaar01Form: {
          Commentaar01: 'comment text 01',
        },
        Commentaar02Form: {
          Commentaar02: '',
        },
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      const expected = '{"01":"comment text 01"}';
      expect(result).toEqual(expected);
    });

    it('should return general comment', () => {
      const formValue = {
        CommentaarAlgemeenForm: {
          CommentaarAlgemeen: 'comment text 01',
        },
        Commentaar02Form: {
          Commentaar02: '',
        },
        competentieForm: {
          competentie: {
            CompetentieID: 2,
            Naam: 'Bedrijfsvoeren Gewasbescherming',
          },
        },
      };
      const result = getCommentListFromFormValue(formValue);
      const expected = '{"Algemeen":"comment text 01"}';
      expect(result).toEqual(expected);
    });
  });

  describe('parseSpecialItems()', () => {
    describe('DoelstellingItems', () => {
      it('should parse V1 data when vast status != new', () => {
        const data = {
          // DoelstellingData:
          //   '{\"Doelstelling\":[{\"text\":\"Doelstelling\",\"date\":\"2015-10-29T12:31:12.838Z\",\"by\":\"Even, S.\"},{\"text\":\"Doel\",\"date\":\"2015-11-16T09:39:30.455Z\",\"by\":\"Even, S.\"},{\"text\":\"Bewustwording van de risico’s van gewasbescherming voor mens (gebruiker) en milieu. Door het uitdiepen van de volgende onderwerpen:\\n- Persoonlijke bescherming\\n- Etikettering\\n- Actualiteiten middelen\\n- Emissie\",\"date\":\"2015-11-17T10:11:47.874Z\",\"by\":\"Even, S.\"}],\"DoelstellingS\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Bewustwording van de gebruiker van gewasbeschermingsmiddelen, hij/zij moet zich bewust zijn van de juiste maatregelen om veilig om te gaan met gewasbeschermingsmiddelen/apparatuur/persoonlijke beschermingsmiddelen.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingM\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Aan de hand van interactie met het publiek door het stellen van vragen, het inbrengen van een stelling of door een quiz wordt het publiek geprikkeld om mee te denken. Dit zorgt voor nog meer bewustwording van het publiek.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingA\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Tijdens de bijeenkomst zullen praktijkvoorbeelden worden behandeld welke herkenbaar zijn voor de deelnemer. Hierdoor zullen ze aan het denken gezet m.b.t. het handelen van de deelnemer in de eigen situatie.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingR\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Het doel is haalbaar, wanneer de deelnemer oplet en actief meedoet met bijv. een quiz krijgt de deelnemer voldoende handvatten uitgereikt om zelf mee aan de slag te gaan.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingT\":[{\"text\":\"Doel T.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}]}',
          DoelstellingData:
            '{"Doelstelling": [{"text":"Doel","date":"2015-10-29T12:31:12.838Z","by":"Even, S."}]',
          Status: 'Goedgekeurd',
        } as IManageSpecialty;
        const result = parseSpecialItems(data, 'DoelstellingData');
        const expected = {
          Doelstelling: '{"Doelstelling": [{"text":"Doel","date":"2015-10-29T12:31:12.838Z","by":"Even, S."}]',
          DoelstellingS: 'Geen gegevens',
          DoelstellingM: 'Geen gegevens',
          DoelstellingA: 'Geen gegevens',
          DoelstellingR: 'Geen gegevens',
          DoelstellingT: 'Geen gegevens',
        } as IDoelstellingItems;
        expect(result).toEqual(expected);
      });

      it('should parse V1 data when vast status = new', () => {
        const data = {
          // DoelstellingData:
          //   '{\"Doelstelling\":[{\"text\":\"Doelstelling\",\"date\":\"2015-10-29T12:31:12.838Z\",\"by\":\"Even, S.\"},{\"text\":\"Doel\",\"date\":\"2015-11-16T09:39:30.455Z\",\"by\":\"Even, S.\"},{\"text\":\"Bewustwording van de risico’s van gewasbescherming voor mens (gebruiker) en milieu. Door het uitdiepen van de volgende onderwerpen:\\n- Persoonlijke bescherming\\n- Etikettering\\n- Actualiteiten middelen\\n- Emissie\",\"date\":\"2015-11-17T10:11:47.874Z\",\"by\":\"Even, S.\"}],\"DoelstellingS\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Bewustwording van de gebruiker van gewasbeschermingsmiddelen, hij/zij moet zich bewust zijn van de juiste maatregelen om veilig om te gaan met gewasbeschermingsmiddelen/apparatuur/persoonlijke beschermingsmiddelen.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingM\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Aan de hand van interactie met het publiek door het stellen van vragen, het inbrengen van een stelling of door een quiz wordt het publiek geprikkeld om mee te denken. Dit zorgt voor nog meer bewustwording van het publiek.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingA\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Tijdens de bijeenkomst zullen praktijkvoorbeelden worden behandeld welke herkenbaar zijn voor de deelnemer. Hierdoor zullen ze aan het denken gezet m.b.t. het handelen van de deelnemer in de eigen situatie.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingR\":[{\"text\":\"Geen gegevens\",\"date\":\"2015-10-29T12:31:12.839Z\",\"by\":\"Even, S.\"},{\"text\":\"Het doel is haalbaar, wanneer de deelnemer oplet en actief meedoet met bijv. een quiz krijgt de deelnemer voldoende handvatten uitgereikt om zelf mee aan de slag te gaan.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}],\"DoelstellingT\":[{\"text\":\"Doel T.\",\"date\":\"2015-10-29T13:41:03.521Z\",\"by\":\"Even, S.\"}]}',
          DoelstellingData:
            '{"Doelstelling": [{"text":"Doel","date":"2015-10-29T12:31:12.838Z","by":"Even, S."}],{"DoelstellingS": [{"text":"Doel","date":"2015-10-29T12:31:12.838Z","by":"Even, S."}]',
          Status: 'Nieuw',
        } as IManageSpecialty;
        const result = parseSpecialItems(data, 'DoelstellingData');
        // const expected = {
        //   Doelstelling: 'Geen gegevens',
        //   DoelstellingS: 'Geen gegevens',
        //   DoelstellingM: 'Geen gegevens',
        //   DoelstellingA: 'Geen gegevens',
        //   DoelstellingR: 'Geen gegevens',
        //   DoelstellingT: 'Geen gegevens',
        // } as IDoelstellingItems;
        const expected = {};
        expect(result).toEqual(expected);
      });
    });
  });
});

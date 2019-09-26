import {
  ICurrentItemHistoryArray,
  IManageSpecialty,
  IWerkvormSchemaData,
} from '../manage-specialty/models/manage-specialty';

export function tryParseJSON(jsonString: string) {
  try {
    const o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns 'null', and typeof null === "object",
    // so we must check for that, too.
    if (o && typeof o === 'object' && o !== null) {
      return o;
    }
  } catch (e) {}

  return false;
}

export interface ICurrentItem {
  text: string;
  date: Date;
  by: string;
}

export interface IHistoryItem {
  text: string;
  date: Date;
  by: string;
}

export function returnNewCommentKey(commentKey: string): string {
  let newKey = '';
  switch (commentKey) {
    case 'Titel':
      newKey = '01';
      break;
    case 'Promotietekst':
      newKey = '02';
      break;
    case 'Website':
      newKey = '03';
      break;
    case 'Actualiteiten':
      newKey = '05';
      break;
    case 'Doelstelling':
      newKey = '06';
      break;
    case 'DoelstellingS':
      newKey = '06A';
      break;
    case 'DoelstellingM':
      newKey = '06B';
      break;
    case 'DoelstellingA':
      newKey = '06C';
      break;
    case 'DoelstellingR':
      newKey = '06D';
      break;
    case 'DoelstellingT':
      newKey = '06E';
      break;
    case 'DoelstellingActualiteit':
      newKey = '06F';
      break;
    case 'Inhoud':
      newKey = '07';
      break;
    case 'GeintegreerdeGewasbescherming':
      newKey = '08';
      break;
    case 'PreventieveMaatregelen':
      newKey = '08A';
      break;
    case 'TeelttechnischeMaatregelen':
      newKey = '08B';
      break;
    case 'WaarschuwingEnAdviesSystemen':
      newKey = '08C';
      break;
    case 'NietChemischeMogelijkheden':
      newKey = '08D';
      break;
    case 'ChemischeGewasbescherming':
      newKey = '08E';
      break;
    case 'EmissieBeperking':
      newKey = '08F';
      break;
    case 'Werkvormen':
      newKey = '09';
      break;
    case 'Docenten':
      newKey = '11';
      break;
    case 'IndividueleRelevantie':
      newKey = '12';
      break;
    case 'Materiaal':
      newKey = '13';
      break;
    case 'EvaluatieWijze':
      newKey = '14';
      break;

    default:
      newKey = commentKey;
      break;
  }
  return newKey;
}

export const questionsControlsMap = {
  '01': 'titel',
  '02': 'promotietekst',
  '03': 'website',
  '04': 'doelgroep',
  '05': 'actualiteiten',
  '06': 'doelstelling',
  '06A': 'doelstellingS',
  '06B': 'doelstellingM',
  '06C': 'doelstellingA',
  '06D': 'doelstellingR',
  '06E': 'doelstellingT',
  '06F': 'doelstellingActualiteit',
  '07': 'inhoud',
  '08': 'geintegreerdeGewasbescherming',
  '08A': 'preventieveMaatregelen',
  '08B': 'teelttechnischeMaatregelen',
  '08C': 'waarschuwingEnAdviesSystemen',
  '08D': 'nietChemischeMogelijkheden',
  '08E': 'chemischeGewasbescherming',
  '08F': 'emissieBeperking',
  '09': 'werkvorm',
  '10': 'schema',
  '11': 'docenten',
  '12': 'individueleRelevantie',
  '13': 'materiaal',
  '14': 'evaluatieWijze',
  Algemeen: 'algemeen',
};

export const beoordelingStatusMap = {
  TerBeoordeling: 'Ter beoordeling',
  CommentaarGevraagd: 'Commentaar gevraagd',
  Goedgekeurd: 'Goedgekeurd',
  Afgekeurd: 'Afgekeurd',
};

export function replaceAll(
  value: string,
  token: string,
  newToken: string,
  ignoreCase: boolean = true,
): string {
  let str = value + '';
  let i = -1;

  if (typeof token === 'string') {
    if (ignoreCase) {
      while (
        (i = str
          .toLowerCase()
          .indexOf(token, i >= 0 ? i + newToken.length : 0)) !== -1
      ) {
        str = str.substring(0, i) + newToken + str.substring(i + token.length);
      }
    } else {
      return value.split(token).join(newToken);
    }
  }
  return str;
}

export function processDiscussions(discussions) {
  if (discussions === null) {
    return;
  }
  if (discussions.length === 0) {
    return;
  }

  const commentaren: any[] = [];

  // Verwerk elke datum/commentaar db record
  discussions.forEach((commentObject: any) => {
    let commentaarObject = tryParseJSON(commentObject.Commentaar);
    if (commentaarObject === false) {
      // Legacy discussie, zet in algemeen discussie.

      const commentaar: IComment = {
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
      Object.keys(commentaarObject).forEach((commentKey) => {
        if (
          commentaarObject[commentKey] !== undefined &&
          commentaarObject[commentKey].length !== 0
        ) {
          const comment = commentaarObject[commentKey];
          const newKey = returnNewCommentKey(commentKey);

          const commentaar: IComment = {
            Commentaar: replaceAll(comment, '\n', '<br />'),
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
  return commentaren;
}

export function getCommentListFromFormValue(formValue: {}): string {
  const commentsString: string = null;

  if (formValue === undefined) {
    return commentsString;
  }

  // Commentaar01Form.Commentaar01: "comment text 01";
  // Commentaar07Form.Commentaar07: "comment text 07";
  // target: "{\"01\":\"Test2\"}",
  const comments = {};
  Object.keys(formValue)
    .filter((key) => key.startsWith('Commentaar'))
    .forEach((form) => {
      const formComment = form;
      const key = formComment.replace('Commentaar', '').replace('Form', '');
      if (formValue[formComment][`Commentaar${key}`] !== '') {
        comments[key] = formValue[formComment][`Commentaar${key}`];
      }
    });
  if (isEmpty(comments)) {
    return null;
  }
  return JSON.stringify(comments);
}

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function capitalizeFirstLetter(string) {
  if (!string || string.length === 0) {
    return '';
  }
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function deCapitalizeFirstLetter(string) {
  return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
}

export const GeintegreerdeGewasbeschermingItems: string[] = [
  'GeintegreerdeGewasbescherming',
  'PreventieveMaatregelen',
  'TeelttechnischeMaatregelen',
  'WaarschuwingEnAdviesSystemen',
  'NietChemischeMogelijkheden',
  'ChemischeGewasbescherming',
  'EmissieBeperking',
];

export const DoelstellingItems: string[] = [
  'Doelstelling',
  'DoelstellingS',
  'DoelstellingM',
  'DoelstellingA',
  'DoelstellingR',
  'DoelstellingT',
];

export function parseSpecialItems<T>(
  data: IManageSpecialty,
  specialItemData: 'GeintegreerdeGewasbeschermingData' | 'DoelstellingData',
): T {
  let items: string[] = DoelstellingItems;
  if (specialItemData === 'GeintegreerdeGewasbeschermingData') {
    items = GeintegreerdeGewasbeschermingItems;
  }
  const parsedData = tryParseJSON(data[specialItemData]);
  const specialItems: T = {} as T;
  if (parsedData === false) {
    // Legacy
    if (data.Status !== 'Nieuw') {
      items.forEach((item: string, index: number) => {
        if (index === 0) {
          specialItems[item] = data[`${specialItemData}`];
        } else {
          specialItems[item] = 'Geen gegevens';
        }
      });
    }
  } else {
    // New doelstelling data.
    if (isObject(parsedData[Object.keys(parsedData)[0]])) {
      // New V2
      items.forEach((item: string) => {
        specialItems[item] = JSON.stringify(parsedData[item]);
      });
    } else {
      // New V1
      // New V2
      items.forEach((item: string) => {
        specialItems[item] = parsedData[item];
      });
    }
  }
  return specialItems;
}

// export function parseGeintegreerdeGewasbescherming(data: IManageSpecialty) {
//   const parsedData = tryParseJSON(data.GeintegreerdeGewasbeschermingData);
//   let ggItems: IGGItems;
//   if (parsedData === false) {
//     // Legacy
//     if (data.Status !== 'Nieuw') {
//       ggItems = {
//         GeintegreerdeGewasbescherming: data.GeintegreerdeGewasbeschermingData,
//         PreventieveMaatregelen: 'Geen gegevens',
//         TeelttechnischeMaatregelen: 'Geen gegevens',
//         WaarschuwingEnAdviesSystemen: 'Geen gegevens',
//         NietChemischeMogelijkheden: 'Geen gegevens',
//         ChemischeGewasbescherming: 'Geen gegevens',
//         EmissieBeperking: 'Geen gegevens',
//       };
//     }
//   } else {
//     // New doelstelling data.
//     if (isObject(parsedData.GeintegreerdeGewasbescherming)) {
//       // New V2
//       ggItems = {
//         GeintegreerdeGewasbescherming: JSON.stringify(
//           parsedData.GeintegreerdeGewasbescherming,
//         ),
//         PreventieveMaatregelen: JSON.stringify(
//           parsedData.PreventieveMaatregelen,
//         ),
//         TeelttechnischeMaatregelen: JSON.stringify(
//           parsedData.TeelttechnischeMaatregelen,
//         ),
//         WaarschuwingEnAdviesSystemen: JSON.stringify(
//           parsedData.WaarschuwingEnAdviesSystemen,
//         ),
//         NietChemischeMogelijkheden: JSON.stringify(
//           parsedData.NietChemischeMogelijkheden,
//         ),
//         ChemischeGewasbescherming: JSON.stringify(
//           parsedData.ChemischeGewasbescherming,
//         ),
//         EmissieBeperking: JSON.stringify(parsedData.EmissieBeperking),
//       };
//     } else {
//       // New V1
//       ggItems = {
//         GeintegreerdeGewasbescherming: parsedData.GeintegreerdeGewasbescherming,
//         PreventieveMaatregelen: parsedData.PreventieveMaatregelen,
//         TeelttechnischeMaatregelen: parsedData.TeelttechnischeMaatregelen,
//         WaarschuwingEnAdviesSystemen: parsedData.WaarschuwingEnAdviesSystemen,
//         NietChemischeMogelijkheden: parsedData.NietChemischeMogelijkheden,
//         ChemischeGewasbescherming: parsedData.ChemischeGewasbescherming,
//         EmissieBeperking: parsedData.EmissieBeperking,
//       };
//     }
//   }
//   return ggItems;
// }

export function parserHelper(
  historyArray: string,
  currentDate: Date = new Date(),
  currentUserName: string = '',
): ICurrentItemHistoryArray {
  const parsedItem = tryParseJSON(historyArray);
  let currentItem: ICurrentItem = {} as ICurrentItem;
  const historyItems = [];

  const itemToReturn = {
    currentItem: currentItem,
    historyItems: historyItems,
  };

  if (parsedItem === false) {
    currentItem = {
      text: historyArray === undefined ? '' : historyArray,
      date: currentDate,
      by: currentUserName,
    } as ICurrentItem;
    itemToReturn.currentItem = currentItem;
    if (
      currentItem.text !== '' &&
      currentItem.text !== undefined &&
      currentItem.text !== null
    ) {
      historyItems.push(Object.assign({}, currentItem));
    }
  } else {
    // Take the last item.
    itemToReturn.currentItem = Object.assign(
      {},
      parsedItem[parsedItem.length - 1],
    );

    if (parsedItem.length >= 1) {
      // Take all but the last one
      for (let i = 0; i < parsedItem.length; i++) {
        itemToReturn.historyItems.push(parsedItem[i]);
      }
    }
  }
  return itemToReturn;
}

export function parseWerkvormData(data: IManageSpecialty): IWerkvormSchemaData {
  const parsedWerkvormData = tryParseJSON(data.WerkvormData);
  const returnObj: IWerkvormSchemaData = {
    werkvormSchema: [],
    werkvormData: undefined, // {} as ICurrentItemHistoryArray,
  };

  if (!parsedWerkvormData) {
    returnObj.werkvormData = parserHelper(data.WerkvormData);
    return returnObj;
  }
  returnObj.werkvormSchema = parsedWerkvormData.Schema;
  if (Array.isArray(parsedWerkvormData.Werkvorm)) {
    returnObj.werkvormData = parserHelper(
      JSON.stringify(parsedWerkvormData.Werkvorm),
    );
    return returnObj;
  }
  returnObj.werkvormData = parserHelper(parsedWerkvormData.Werkvorm);
  return returnObj;
}

export function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}

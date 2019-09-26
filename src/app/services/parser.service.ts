import { Injectable } from '@angular/core';
import { CurrentDataService } from './current-data.service';
import {
  capitalizeFirstLetter,
  deCapitalizeFirstLetter,
  DoelstellingItems,
  GeintegreerdeGewasbeschermingItems,
  IHistoryItem,
  parserHelper,
  tryParseJSON,
} from '../shared/utils';
import {
  ICurrentItemHistoryArray,
  IManageSpecialty,
} from '../manage-specialty/models/manage-specialty';
import { State } from '../manage-specialty/store/reducers/manage-specialty.reducer';

@Injectable()
export class ParserService {
  constructor(private currentDataService: CurrentDataService) {}

  parseHistoryItems(historyArray): ICurrentItemHistoryArray {
    return parserHelper(
      historyArray,
      this.currentDataService.getCurrentDate(),
      this.currentDataService.getUserName(),
    );
    // const parsedItem = tryParseJSON(historyArray);
    // let currentItem: ICurrentItem = {} as ICurrentItem;
    // const historyItems = [];
    //
    // const itemToReturn = {
    //   currentItem: currentItem,
    //   historyItems: historyItems,
    // };
    //
    // if (parsedItem === false) {
    //   currentItem = {
    //     text: historyArray,
    //     date: this.currentDataService.getCurrentDate(),
    //     by: this.currentDataService.getUserName(),
    //   } as ICurrentItem;
    //   itemToReturn.currentItem = currentItem;
    //   if (currentItem.text !== '' && currentItem.text !== undefined) {
    //     historyItems.push(Object.assign({}, currentItem));
    //   }
    // } else {
    //   // Take the last item.
    //   itemToReturn.currentItem = Object.assign(
    //     {},
    //     parsedItem[parsedItem.length - 1],
    //   );
    //
    //   if (parsedItem.length >= 1) {
    //     // Take all but the last one
    //     for (let i = 0; i < parsedItem.length; i++) {
    //       itemToReturn.historyItems.push(parsedItem[i]);
    //     }
    //   }
    // }
    //
    // return itemToReturn;
  }

  // getDataFromFormValue(formValue, specialtyState: State): IManageSpecialty {
  //   const data = { ...specialtyState.data };
  //   Object.keys(formValue)
  //     .filter((key) => key.startsWith('Data'))
  //     .forEach((form) => {
  //       const formData = form;
  //       const key = formData.replace('Data', '').replace('Form', '');
  //       if (formValue[formData][`${key}`] !== '') {
  //         const upperCasedKey = capitalizeFirstLetter(key);
  //         switch (upperCasedKey) {
  //           case 'Titel':
  //           case 'Promotietekst':
  //             data[upperCasedKey] = formValue[formData][key];
  //             // parse current item, add new item and stringify again
  //             const historyItems = this.parseHistoryItems(
  //               data[`${upperCasedKey}Data`],
  //             );
  //             const newItem: IHistoryItem = {
  //               text: formValue[formData][key],
  //               date: this.currentDataService.getCurrentDate(),
  //               by: this.currentDataService.getUserName(),
  //             };
  //             historyItems.historyItems.push(newItem);
  //
  //             data[`${upperCasedKey}Data`] = JSON.stringify(
  //               historyItems.historyItems,
  //             );
  //             break;
  //           case 'Werkvorm':
  //             data[upperCasedKey] = formValue[formData][key];
  //             const werkvormHistoryItems = this.parseHistoryItems(
  //               specialtyState.werkvormData,
  //             );
  //             const newWerkvormItem: IHistoryItem = {
  //               text: formValue[formData][key],
  //               date: this.currentDataService.getCurrentDate(),
  //               by: this.currentDataService.getUserName(),
  //             };
  //             werkvormHistoryItems.historyItems.push(newWerkvormItem);
  //
  //             data[`${upperCasedKey}Data`] = JSON.stringify({
  //               Werkvorm: werkvormHistoryItems.historyItems,
  //               Schema: specialtyState.werkvormSchema,
  //             });
  //
  //             break;
  //           case 'GeintegreerdeGewasbescherming':
  //           case 'PreventieveMaatregelen':
  //           case 'TeelttechnischeMaatregelen':
  //           case 'WaarschuwingEnAdviesSystemen':
  //           case 'NietChemischeMogelijkheden':
  //           case 'ChemischeGewasbescherming':
  //           case 'EmissieBeperking':
  //           case 'Doelstelling':
  //           case 'DoelstellingS':
  //           case 'DoelstellingM':
  //           case 'DoelstellingA':
  //           case 'DoelstellingR':
  //           case 'DoelstellingT': // Do not process, but process separately
  //             break;
  //           default:
  //             const history = this.parseHistoryItems(data[upperCasedKey]);
  //             const newHistoryItem: IHistoryItem = {
  //               text: formValue[formData][key],
  //               date: this.currentDataService.getCurrentDate(),
  //               by: this.currentDataService.getUserName(),
  //             };
  //             history.historyItems.push(newHistoryItem);
  //
  //             data[upperCasedKey] = JSON.stringify(history.historyItems);
  //             break;
  //         }
  //       }
  //     });
  //   // Process special items
  //   const ggItems = { ...specialtyState.ggItems };
  //   this.processSpecialItems(
  //     GeintegreerdeGewasbeschermingItems,
  //     formValue,
  //     ggItems,
  //   );
  //   if (ggItems) {
  //     data.GeintegreerdeGewasbeschermingData = JSON.stringify(ggItems);
  //   }
  //   const doelstellingItems = { ...specialtyState.doelstellingItems };
  //   this.processSpecialItems(DoelstellingItems, formValue, doelstellingItems);
  //   if (doelstellingItems) {
  //     data.DoelstellingData = JSON.stringify(doelstellingItems);
  //   }
  //
  //   return data;
  // }
  getCommentsFromModelValue(specialtyState: State): IManageSpecialty {
    const data = { ...specialtyState.data };
    const state = { ...specialtyState };

    const comments = {};
    if (state.modelComments) {
      Object.keys(state.modelComments).forEach((key) => {
        const formValue = state.modelComments[key].value;

        // Commentaar01Form.Commentaar01: "comment text 01";
        // Commentaar07Form.Commentaar07: "comment text 07";
        // target: "{\"01\":\"Test2\"}",
        if (formValue !== '') {
          comments[key.replace('commentaar', '')] = formValue;
        }
      });
      if (this.isEmpty(comments)) {
        return data;
      }
      data.Commentaren = JSON.stringify(comments);
    }
    return data;
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  getDataFromModelValue(specialtyState: State): IManageSpecialty {
    const data = { ...specialtyState.data };
    const state = { ...specialtyState };
    Object.keys(state.model).forEach((key) => {
      const formValue = state.model[key].value;
      // TODO Check this if value is not available
      if (formValue !== '') {
        const upperCasedKey = capitalizeFirstLetter(key);
        switch (upperCasedKey) {
          case 'Titel':
          case 'Promotietekst':
            if (data[upperCasedKey] !== formValue) {
              data[upperCasedKey] = formValue;
              // parse current item, add new item and stringify again
              const historyItems = this.parseHistoryItems(
                data[`${upperCasedKey}Data`],
              );
              const newItem: IHistoryItem = {
                text: formValue,
                date: this.currentDataService.getCurrentDate(),
                by: this.currentDataService.getUserName(),
              };
              historyItems.historyItems.push(newItem);

              data[`${upperCasedKey}Data`] = JSON.stringify(
                historyItems.historyItems,
              );
            }
            break;
          case 'Werkvorm':
            data[upperCasedKey] = formValue;
            const werkvormHistoryItems = this.parseHistoryItems(
              specialtyState.werkvormData,
            );
            let werkvormTextChanged = false;
            if (werkvormHistoryItems.currentItem.text !== formValue) {
              const newWerkvormItem: IHistoryItem = {
                text: formValue,
                date: this.currentDataService.getCurrentDate(),
                by: this.currentDataService.getUserName(),
              };
              werkvormHistoryItems.historyItems.push(newWerkvormItem);
              werkvormTextChanged = true;
            }
            if (werkvormTextChanged || specialtyState.werkvormSchemaChanged) {
              data[`${upperCasedKey}Data`] = JSON.stringify({
                Werkvorm: werkvormHistoryItems.historyItems,
                Schema: specialtyState.werkvormSchema,
              });
            }
            break;
          case 'GeintegreerdeGewasbescherming':
          case 'PreventieveMaatregelen':
          case 'TeelttechnischeMaatregelen':
          case 'WaarschuwingEnAdviesSystemen':
          case 'NietChemischeMogelijkheden':
          case 'ChemischeGewasbescherming':
          case 'EmissieBeperking':
          case 'Doelstelling':
          case 'DoelstellingS':
          case 'DoelstellingM':
          case 'DoelstellingA':
          case 'DoelstellingR':
          case 'DoelstellingT': // Do not process, but process separately
            break;
          case 'KostenPerDeelname':
            data[upperCasedKey] = parseFloat(
              formValue.toString().replace(',', '.'),
            );
            break;
          case 'Groepsgrootte':
          case 'AantalSessies':
          case 'Tijdsduur':
            data[upperCasedKey] = formValue.toString();
            break;
          case 'DigitaalAanbod':
            data[upperCasedKey] = formValue;
            break;
          case 'Einddatum':
            // TODO Check for 1970, set null
            // TODO Check if beoordeling needs PersoonID = 0?
            data[upperCasedKey] = formValue.getTime() === 0 ? null : formValue;
            break;
          case 'Aanbieder':
            data.VakgroepID =
              formValue && formValue.hasOwnProperty('VakgroepID')
                ? formValue.VakgroepID
                : data.VakgroepID;
            break;
          case 'Vaardigheden':
          case 'Doelgroep':
            // do not process
            break;
          default:
            const history = this.parseHistoryItems(data[upperCasedKey]);
            if (history.currentItem.text !== formValue) {
              const newHistoryItem: IHistoryItem = {
                text: formValue,
                date: this.currentDataService.getCurrentDate(),
                by: this.currentDataService.getUserName(),
              };
              history.historyItems.push(newHistoryItem);

              data[upperCasedKey] = JSON.stringify(history.historyItems);
            }
            break;
        }
      }
    });
    // Process special items
    const ggItems = { ...specialtyState.ggItems };
    this.processSpecialItems(
      GeintegreerdeGewasbeschermingItems,
      state.model,
      ggItems,
    );
    if (ggItems) {
      data.GeintegreerdeGewasbeschermingData = JSON.stringify(ggItems);
    }
    const doelstellingItems = { ...specialtyState.doelstellingItems };
    this.processSpecialItems(DoelstellingItems, state.model, doelstellingItems);
    if (doelstellingItems) {
      data.DoelstellingData = JSON.stringify(doelstellingItems);
    }

    specialtyState.data = { ...data };
    specialtyState.data = this.processHistory(specialtyState);
    return this.processBeoordeling(specialtyState);
  }

  processSpecialItems(
    specialItems: string[],
    formValues: any,
    items: IGewasbeschermingItems | IDoelstellingItems,
  ) {
    specialItems.forEach((item) => {
      const lowerCasedKey = deCapitalizeFirstLetter(item);
      const formDataValue = formValues[lowerCasedKey].value;

      const historyItem: IHistoryItem = {
        text: undefined,
        date: this.currentDataService.getCurrentDate(),
        by: this.currentDataService.getUserName(),
      };
      if (formDataValue) {
        historyItem.text = formDataValue;
      }
      if (items[item] !== undefined) {
        const parsedItems: IHistoryItem[] = tryParseJSON(items[item])
          ? JSON.parse(items[item])
          : [
              {
                text: items[item],
                date: new Date(2000, 0, 1),
                by: 'onbekend',
              },
            ];
        if (
          formDataValue !== undefined &&
          historyItem.text !== undefined &&
          parsedItems &&
          parsedItems.length &&
          historyItem.text !== parsedItems[parsedItems.length - 1].text
        ) {
          parsedItems.push(historyItem);
        }
        items[item] = parsedItems;
      } else {
        items[item] = [historyItem];
      }
    });
  }

  processHistory(specialtyState: State): IManageSpecialty {
    const model = { ...specialtyState.model };
    const data = { ...specialtyState.data };
    let historyData = [];
    if (specialtyState.historyData !== null) {
      historyData = [...specialtyState.historyData];
    }
    historyData = historyData.reverse();
    // if (data.HistorieData === undefined || vm.vakData.HistorieData === null) {
    //   vm.vakData.HistorieData = [];
    // }
    const changedFields: string[] = [];
    Object.keys(model).forEach((key) => {
      const isDirty = model[key].dirty;
      if (isDirty) {
        changedFields.push(key);
      }
    });

    if (specialtyState.data.ThemaCompetentieChanged) {
      changedFields.push('themaEn/OfCompetentie');
    }
    if (specialtyState.data.VaardighedenChanged) {
      changedFields.push('vaardigheden');
    }
    if (specialtyState.data.KennisgebiedenChanged) {
      changedFields.push('sectoren');
    }
    if (specialtyState.data.BijlagenChanged) {
      changedFields.push('bijlagen');
    }

    let moetBeoordeeldWorden = false;
    if (
      specialtyState.modelJudgement &&
      specialtyState.modelJudgement.beoordelaar &&
      specialtyState.modelJudgement.beoordelaar.value !== null
    ) {
      if (
        data.Beoordeling &&
        data.Beoordeling.DatumGepland === undefined &&
        data.Beoordeling.PersoonID !== 0
      ) {
        moetBeoordeeldWorden = true;
      }

      const vakStatus = specialtyState.data.Status;
      const beoordelingStatus = specialtyState.modelJudgement.beoordelingStatus
        .value
        ? specialtyState.modelJudgement.beoordelingStatus.value.Status
        : 'TerBeoordeling';
      if (
        (vakStatus !== 'Goedgekeurd' && beoordelingStatus === 'Goedgekeurd') ||
        (vakStatus !== 'Afgekeurd' && beoordelingStatus === 'Afgekeurd') ||
        (vakStatus !== 'WordtBeoordeeld' &&
          beoordelingStatus === 'TerBeoordeling')
      ) {
        if (beoordelingStatus === 'TerBeoordeling') {
          specialtyState.data.Status = 'WordtBeoordeeld';
        } else {
          specialtyState.data.Status = beoordelingStatus;
        }
      }
    }

    const commentaren = JSON.parse(data.Commentaren);
    let changedComments = [];
    if (commentaren && commentaren !== null) {
      changedComments = Object.keys(commentaren);
    }

    let historyText = '';
    switch (data.Status) {
      case 'Nieuw':
        historyText = 'Aangemaakt';
        break;
      case 'Voorlopig':
      case 'InOntwerp':
        historyText = 'Aangemaakt';
        break;
      case 'Ingediend':
        historyText = 'Ingediend';
        if (!specialtyState.submitSpecialty) {
          historyText += ', gegevens gewijzigd';
        }
        break;
      case 'WordtBeoordeeld':
        historyText = data.GewijzigdActie;
        if (moetBeoordeeldWorden) {
          historyText = 'Beoordelaar toegewezen';
        } else {
          if (changedComments.length !== 0) {
            historyText = specialtyState.beoordelingGewijzigdText;
          }
        }
        break;
      case 'Goedgekeurd':
        historyText = 'Goedgekeurd';
        break;
      case 'Afgekeurd':
        historyText = 'Afgekeurd';
        break;
    }
    data.GewijzigdActie = historyText;
    data.AanbodCode = data.VakID.toString();

    historyData.push({
      changes: historyText,
      changedFields: changedFields,
      changedComments: changedComments,
      date: this.currentDataService.getCurrentDate(),
      by: this.currentDataService.getUserName(),
    });

    data.Historie = JSON.stringify(historyData);

    return data;
  }

  processBeoordeling(specialtyState: State): IManageSpecialty {
    const data = { ...specialtyState.data };
    const beoordeling = { ...specialtyState.data.Beoordeling };
    const state = { ...specialtyState };
    Object.keys(state.modelJudgement).forEach((key) => {
      const formValue = state.modelJudgement[key].value;
      if (formValue !== '') {
        switch (key) {
          case 'beoordelaar':
            beoordeling.PersoonID = parseInt(formValue, 10);
            break;
          case 'beoordelingStatus':
            beoordeling.Status = formValue
              ? formValue.Status
              : 'TerBeoordeling';
            break;
          case 'rapport':
            beoordeling.Rapport = formValue;
            break;
        }
      }
    });
    data.Beoordeling = beoordeling;

    return data;
  }
}

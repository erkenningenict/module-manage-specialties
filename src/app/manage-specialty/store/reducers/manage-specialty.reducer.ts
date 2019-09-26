import * as manageSpecialty from '../actions/manage-specialty.action';
import { FormState } from '../../../app-module/store/reducers/form.reducer';
import {
  IDoelstellingItems,
  IGGItems,
  IHistoryObject,
  IManageSpecialty,
  IWerkvormSchema,
} from '../../models/manage-specialty';
import { IActualiteit, ICompetentie } from '../../models/lists';
import {
  beoordelingStatusMap,
  parserHelper,
  parseSpecialItems,
  parseWerkvormData,
  processDiscussions,
  questionsControlsMap,
} from '../../../shared/utils';
import * as parse from 'date-fns/parse';
import { IVaardigheid, IVakVraag } from '../../models/skills';
import {
  FormActions,
  UpdateFormValue,
} from '../../../app-module/store/actions/form.actions';

export interface IManageSpecialtyForm {
  aanbieder: FormState<any>;
  titel: FormState<string>;
  doelstelling: FormState<string>;
  doelstellingS: FormState<string>;
  doelstellingM: FormState<string>;
  doelstellingA: FormState<string>;
  doelstellingR: FormState<string>;
  doelstellingT: FormState<string>;
  inhoud: FormState<string>;
  geintegreerdeGewasbescherming: FormState<string>;
  preventieveMaatregelen: FormState<string>;
  teelttechnischeMaatregelen: FormState<string>;
  waarschuwingEnAdviesSystemen: FormState<string>;
  nietChemischeMogelijkheden: FormState<string>;
  chemischeGewasbescherming: FormState<string>;
  emissieBeperking: FormState<string>;
  actualiteiten: FormState<string>;
  individueleRelevantie: FormState<string>;
  werkvorm: FormState<string>;
  docenten: FormState<string>;
  promotietekst: FormState<string>;
  evaluatieWijze: FormState<string>;
  materiaal: FormState<string>;
  website: FormState<string>;
  kostenPerDeelname: FormState<string>;
  groepsgrootte: FormState<number>;
  aantalSessies: FormState<number>;
  tijdsduur: FormState<string>;
  digitaalAanbod: FormState<boolean>;
  einddatum: FormState<Date>;
  doelgroep: FormState<string>;
  vaardigheden: FormState<string>;
}

export interface IJudgementForm {
  beoordelaar: FormState<string>;
  beoordelingStatus: FormState<{ Status: string; label: string }>;
  rapport: FormState<string>;
}

export interface ICommentForm {
  commentaarAlgemeen: FormState<string>;
  commentaar01: FormState<string>;
  commentaar02: FormState<string>;
  commentaar03: FormState<string>;
  commentaar05: FormState<string>;
  commentaar06: FormState<string>;
  commentaar06A: FormState<string>;
  commentaar06B: FormState<string>;
  commentaar06C: FormState<string>;
  commentaar06D: FormState<string>;
  commentaar06E: FormState<string>;
  commentaar06F: FormState<string>;
  commentaar07: FormState<string>;
  commentaar08: FormState<string>;
  commentaar08A: FormState<string>;
  commentaar08B: FormState<string>;
  commentaar08C: FormState<string>;
  commentaar08D: FormState<string>;
  commentaar08E: FormState<string>;
  commentaar08F: FormState<string>;
  commentaar09: FormState<string>;
  commentaar11: FormState<string>;
  commentaar12: FormState<string>;
  commentaar13: FormState<string>;
  commentaar14: FormState<string>;
}

export interface State {
  loaded: boolean;
  loading: boolean;
  data: IManageSpecialty;
  showComments: boolean;
  validCompetences: ICompetentie[];
  discussions: {};
  enableEditing: boolean;
  showIndienenButton: boolean;
  showHistorieButton: boolean;
  showCommentaarButton: boolean;
  showBeoordelingData: boolean;
  enableEditingEinddatum: boolean;
  enableEditingMain: boolean;
  beoordelingGewijzigdText: string;
  beoordelingTabDisabled: boolean;
  tabIndex: number;
  ggItems: IGGItems; // Geintegreerde gewasbescherming
  doelstellingItems: IDoelstellingItems;
  relevanteActualiteiten: IActualiteit[];
  werkvormData: string;
  werkvormSchema: IWerkvormSchema[];
  werkvormSchemaChanged: boolean;
  canUpdateBeoordelaar: boolean;
  canUpdateBeoordeling: boolean;
  beoordelingRapportRequired: boolean;
  beoordelingStatusRequired: boolean;
  model: IManageSpecialtyForm;
  modelJudgement: IJudgementForm;
  modelComments: ICommentForm;
  invalidControls: string[];
  historyData: IHistoryObject[];
  submitSpecialty: boolean;
  error: string;
  success: boolean;
}

const initialState: State = {
  loaded: false,
  loading: false,
  data: {} as IManageSpecialty,
  showComments: true,
  validCompetences: [],
  discussions: {},
  showIndienenButton: false,
  showHistorieButton: true,
  showCommentaarButton: true,
  showBeoordelingData: false,
  enableEditing: true,
  enableEditingEinddatum: false,
  enableEditingMain: true,
  beoordelingGewijzigdText: '',
  beoordelingTabDisabled: false,
  tabIndex: 0,
  ggItems: {} as IGGItems,
  doelstellingItems: {} as IDoelstellingItems,
  relevanteActualiteiten: [],
  werkvormData: '',
  werkvormSchema: [],
  werkvormSchemaChanged: false,
  canUpdateBeoordelaar: false,
  canUpdateBeoordeling: false,
  beoordelingRapportRequired: false,
  beoordelingStatusRequired: false,
  model: {} as IManageSpecialtyForm,
  modelJudgement: {} as IJudgementForm,
  modelComments: {} as ICommentForm,
  invalidControls: [],
  historyData: [],
  submitSpecialty: false,
  error: undefined,
  success: false,
};

export function reducer(
  state = initialState,
  action: manageSpecialty.FetchSpecialtyActions | UpdateFormValue,
): State {
  switch (action.type) {
    case manageSpecialty.INITIALIZE_STATE: {
      return initialState;
    }

    case manageSpecialty.SET_TAB_INDEX: {
      return {
        ...state,
        tabIndex: action.payload,
      };
    }

    case manageSpecialty.FETCH_SPECIALTY: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case manageSpecialty.FETCH_SPECIALTY_SUCCESS: {
      const data = { ...action.payload };
      const currentState = { ...state };
      const newState = { ...initialState };

      if (currentState && currentState.data.VakID === data.VakID) {
        newState.tabIndex = currentState.tabIndex;
      } else {
        newState.tabIndex = 0;
      }

      if (data.Status === 'Nieuw') {
        data.ThemaID = 1;
        data.CompetentieID = 3;
        data.GekozenVaardigheden = [];
        data.GekozenKennisgebieden = [];
        data.VakgroepID = undefined;
        data.VakgroepNaam = undefined;
        data.ThemaCompetentieChanged = true;
        data.GewijzigdActie = 'Aangemaakt';
        data.DatumAangemaakt = new Date();
        data.Einddatum = null;
      }

      if (data.GekozenKennisgebieden === null) {
        data.GekozenKennisgebieden = [];
      }

      newState.ggItems = parseSpecialItems(
        data,
        'GeintegreerdeGewasbeschermingData',
      );
      newState.doelstellingItems = parseSpecialItems(data, 'DoelstellingData');
      const werkvormDataObj = parseWerkvormData(data);
      newState.werkvormData = JSON.stringify(
        werkvormDataObj.werkvormData.historyItems,
      );

      newState.werkvormSchema = werkvormDataObj.werkvormSchema;

      newState.model = {
        aanbieder: {
          value:
            data.VakgroepID === undefined
              ? ''
              : {
                  VakgroepID: data.VakgroepID,
                  VakgroepNaam: data.VakgroepNaam,
                },
          status: data.VakgroepID === undefined ? 'INVALID' : 'VALID',
        },
        titel: {
          value:
            data.TitelData === ''
              ? data.Titel
              : parserHelper(data.TitelData).currentItem.text,
        },
        vaardigheden: {
          value: undefined,
          status: data.GekozenVaardigheden.length === 0 ? 'INVALID' : 'VALID',
        },
        doelgroep: {
          value: undefined,
          status:
            !data.GekozenKennisgebieden ||
            (data.GekozenKennisgebieden &&
              data.GekozenKennisgebieden.length === 0)
              ? 'INVALID'
              : 'VALID',
        },
        doelstelling: {
          value: parserHelper(newState.doelstellingItems.Doelstelling)
            .currentItem.text,
        },
        doelstellingS: {
          value: parserHelper(newState.doelstellingItems.DoelstellingS)
            .currentItem.text,
        },
        doelstellingM: {
          value: parserHelper(newState.doelstellingItems.DoelstellingM)
            .currentItem.text,
        },
        doelstellingA: {
          value: parserHelper(newState.doelstellingItems.DoelstellingA)
            .currentItem.text,
        },
        doelstellingR: {
          value: parserHelper(newState.doelstellingItems.DoelstellingR)
            .currentItem.text,
        },
        doelstellingT: {
          value: parserHelper(newState.doelstellingItems.DoelstellingT)
            .currentItem.text,
        },
        inhoud: { value: parserHelper(data.Inhoud).currentItem.text },
        geintegreerdeGewasbescherming: {
          value: parserHelper(newState.ggItems.GeintegreerdeGewasbescherming)
            .currentItem.text,
        },
        preventieveMaatregelen: {
          value: parserHelper(newState.ggItems.PreventieveMaatregelen)
            .currentItem.text,
        },
        teelttechnischeMaatregelen: {
          value: parserHelper(newState.ggItems.TeelttechnischeMaatregelen)
            .currentItem.text,
        },
        waarschuwingEnAdviesSystemen: {
          value: parserHelper(newState.ggItems.WaarschuwingEnAdviesSystemen)
            .currentItem.text,
        },
        nietChemischeMogelijkheden: {
          value: parserHelper(newState.ggItems.NietChemischeMogelijkheden)
            .currentItem.text,
        },
        chemischeGewasbescherming: {
          value: parserHelper(newState.ggItems.ChemischeGewasbescherming)
            .currentItem.text,
        },
        emissieBeperking: {
          value: parserHelper(newState.ggItems.EmissieBeperking).currentItem
            .text,
        },
        actualiteiten: {
          value: parserHelper(data.Actualiteiten).currentItem.text,
        },
        individueleRelevantie: {
          value: parserHelper(data.IndividueleRelevantie).currentItem.text,
        },
        werkvorm: {
          value: parserHelper(newState.werkvormData).currentItem.text,
        },
        docenten: { value: parserHelper(data.Docenten).currentItem.text },
        promotietekst: {
          value:
            data.PromotietekstData === ''
              ? data.Promotietekst
              : parserHelper(data.PromotietekstData).currentItem.text,
        },
        evaluatieWijze: {
          value: parserHelper(data.EvaluatieWijze).currentItem.text,
        },
        materiaal: { value: parserHelper(data.Materiaal).currentItem.text },
        kostenPerDeelname: {
          value: data.KostenPerDeelname.toLocaleString('nl-NL', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        },
        groepsgrootte: { value: data.Groepsgrootte },
        aantalSessies: { value: data.AantalSessies },
        tijdsduur: { value: data.Tijdsduur.replace('.', ',') },
        digitaalAanbod: { value: data.DigitaalAanbod },
        einddatum: { value: parse(data.Einddatum) },
        website: { value: parserHelper(data.Website).currentItem.text },
      };

      // We do not know the min. points, because that is stored in the skill reducer
      // If needed, use an effect to get that property

      switch (data.Status) {
        case 'Nieuw':
          newState.showIndienenButton = false;
          newState.showHistorieButton = false;
          newState.showCommentaarButton = false;
          newState.beoordelingTabDisabled = true;
          newState.showComments = false;
          break;
        case 'Voorlopig':
        case 'InOntwerp':
          newState.showIndienenButton = true;
          newState.showCommentaarButton = false;
          newState.beoordelingTabDisabled = true;
          newState.showComments = false;
          break;
        case 'Ingediend':
          newState.showCommentaarButton = false;
          newState.beoordelingTabDisabled = false;
          newState.showComments = false;
          if (data.IsRector) {
            newState.showBeoordelingData = true;
          }
          break;
        case 'Ingetrokken':
          newState.showCommentaarButton = false;
          newState.beoordelingTabDisabled = false;
          newState.showComments = false;
          break;
        case 'WordtBeoordeeld':
          newState.showBeoordelingData = true;
          if (data.IsHoogleraar) {
            newState.beoordelingGewijzigdText =
              'Wordt beoordeeld, commentaar kennisaanbieder';
          }
          if (data.IsRector || data.IsBeoordelaar) {
            newState.beoordelingGewijzigdText =
              'Wordt beoordeeld, commentaar beoordelaar';
          }

          newState.showComments = true;
          break;
        case 'Goedgekeurd':
          newState.showBeoordelingData = true;
          newState.enableEditing = false;
          newState.enableEditingMain = false;

          if (data.IsRector || data.IsHoogleraar) {
            newState.enableEditingMain = true;
          }
          if (data.IsRector) {
            newState.enableEditingEinddatum = true;
          }
          break;
        case 'Afgekeurd':
          newState.showBeoordelingData = true;
          break;
        default:
          newState.showComments = true;
          break;
      }

      if (newState.showComments) {
        newState.modelComments = {
          commentaarAlgemeen: {
            value: '',
          },
          commentaar01: {
            value: '',
          },
          commentaar02: {
            value: '',
          },
          commentaar03: {
            value: '',
          },
          commentaar05: {
            value: '',
          },
          commentaar06: {
            value: '',
          },
          commentaar06A: {
            value: '',
          },
          commentaar06B: {
            value: '',
          },
          commentaar06C: {
            value: '',
          },
          commentaar06D: {
            value: '',
          },
          commentaar06E: {
            value: '',
          },
          commentaar06F: {
            value: '',
          },
          commentaar07: {
            value: '',
          },
          commentaar08: {
            value: '',
          },
          commentaar08A: {
            value: '',
          },
          commentaar08B: {
            value: '',
          },
          commentaar08C: {
            value: '',
          },
          commentaar08D: {
            value: '',
          },
          commentaar08E: {
            value: '',
          },
          commentaar08F: {
            value: '',
          },
          commentaar09: {
            value: '',
          },
          commentaar11: {
            value: '',
          },
          commentaar12: {
            value: '',
          },
          commentaar13: {
            value: '',
          },
          commentaar14: {
            value: '',
          },
        };
      }

      if (
        data.IsRector &&
        data.Status !== 'Nieuw' &&
        data.Status !== 'Voorlopig' &&
        data.Status !== 'InOntwerp'
      ) {
        newState.canUpdateBeoordelaar = true;
        const beoordelingValid = data.Beoordeling !== null;
        const beoordelingStatusStatus = {
          Status: beoordelingValid ? data.Beoordeling.Status : 'TerBeoordeling',
          label: beoordelingValid
            ? beoordelingStatusMap[data.Beoordeling.Status]
            : 'Ter beoordeling',
        };
        newState.modelJudgement = {
          beoordelaar: {
            value: beoordelingValid
              ? data.Beoordeling &&
                data.Beoordeling.PersoonID &&
                data.Beoordeling.PersoonID.toString()
              : undefined,
            status: beoordelingValid ? 'VALID' : 'INVALID',
          },
          beoordelingStatus: {
            value: beoordelingValid ? beoordelingStatusStatus : undefined,
            status: beoordelingValid ? 'VALID' : 'DISABLED',
          },
          rapport: {
            value: beoordelingValid
              ? data.Beoordeling.Rapport === ''
                ? undefined
                : data.Beoordeling.Rapport
              : undefined,
            status: beoordelingValid ? 'VALID' : 'DISABLED',
          },
        };
      }
      if (
        data.Beoordeling !== null &&
        data.Beoordeling.PersoonID === data.CurrentPersoonID
      ) {
        newState.canUpdateBeoordeling = true;
        let statusRapportValid = true;
        if (
          ['Goedgekeurd', 'Afgekeurd'].indexOf(data.Beoordeling.Status) > 0 &&
          data.Beoordeling.Rapport === ''
        ) {
          statusRapportValid = false;
        }
        newState.modelJudgement = {
          beoordelaar: {
            value:
              data.Beoordeling &&
              data.Beoordeling.PersoonID &&
              data.Beoordeling.PersoonID.toString(),
            status: 'VALID',
          },
          beoordelingStatus: {
            value: {
              Status: data.Beoordeling.Status,
              label: beoordelingStatusMap[data.Beoordeling.Status],
            },
            status: 'VALID',
          },
          rapport: {
            value: data.Beoordeling.Rapport,
            status:
              data.Beoordeling.Rapport === '' && statusRapportValid
                ? 'DISABLED'
                : 'VALID',
          },
        };
      } else if (data.Beoordeling !== null) {
        newState.modelJudgement = {
          beoordelaar: {
            value:
              data.Beoordeling &&
              data.Beoordeling.PersoonID &&
              data.Beoordeling.PersoonID.toString(),
            status: 'VALID',
          },
          beoordelingStatus: {
            value: {
              Status: data.Beoordeling.Status,
              label: beoordelingStatusMap[data.Beoordeling.Status],
            },
            status: 'VALID',
          },
          rapport: {
            value: data.Beoordeling.Rapport,
            status: 'DISABLED',
          },
        };
      }

      // Disable editing for Vakcommissie AG members
      if (data.IsVakcommissieAG) {
        newState.enableEditing = false;
        newState.enableEditingMain = false;
      }

      const initialBeoordeling = { ...data.Beoordeling };
      initialBeoordeling.BeoordelingChanged = false;
      data.Beoordeling = initialBeoordeling;
      newState.discussions = processDiscussions(data.Discussies);
      newState.data = data;
      const history = JSON.parse(data.Historie);
      newState.historyData = history && history.reverse();
      newState.loaded = true;
      newState.loading = false;
      return newState;
    }

    case manageSpecialty.FETCH_SPECIALTY_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload,
        enableEditing: false,
        showComments: false,
      };
    }

    case manageSpecialty.SERIALIZE_SPECIALTY: {
      return {
        ...state,
        loading: true,
        success: false,
      };
    }

    case manageSpecialty.UPDATE_SPECIALTY_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        success: true,
      };
    }

    case manageSpecialty.UPDATE_SPECIALTY_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload,
        enableEditing: false,
        showComments: false,
        success: false,
      };
    }
    case manageSpecialty.DELETE_SPECIALTY: {
      return {
        ...state,
        loading: true,
      };
    }

    case manageSpecialty.DELETE_SPECIALTY_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload,
      };
    }

    case manageSpecialty.DELETE_SPECIALTY_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        data: null,
        enableEditing: false,
        showComments: false,
      };
    }

    case manageSpecialty.THEMA_CHANGE: {
      const data = { ...state.data };
      const newState = { ...state };
      data.ThemaCompetentieChanged = true;
      data.ThemaID = action.payload.ThemaID;
      data.Thema = action.payload.Naam;
      data.GekozenVaardigheden = [];
      const model = { ...state.model };
      newState.model = {
        ...model,
        vaardigheden: { value: undefined, status: 'INVALID' },
      };
      return {
        ...state,
        ...newState,
        data,
      };
    }

    case manageSpecialty.SET_COMPETENTIES: {
      const data = { ...state.data };
      data.ThemaCompetentieChanged = true;
      data.CompetentieID = action.payload;
      return {
        ...state,
        data,
      };
    }

    case manageSpecialty.COMPETENTIE_CHANGE: {
      const data = { ...state.data };
      const newState = { ...state };
      data.ThemaCompetentieChanged = true;
      data.CompetentieID = action.payload.CompetentieID;
      data.Competentie = action.payload.Naam;
      data.GekozenVaardigheden = [];
      const model = { ...state.model };
      newState.model = {
        ...model,
        vaardigheden: { value: undefined, status: 'INVALID' },
      };
      return {
        ...state,
        ...newState,
        data,
      };
    }

    case manageSpecialty.VAARDIGHEID_CHANGE: {
      const data = { ...state.data };
      const newState = { ...state };
      data.VaardighedenChanged = true;
      let gekozenVaardigheden = [...data.GekozenVaardigheden];
      if (action.payload.checked) {
        gekozenVaardigheden.push({
          VaardigheidID: action.payload.vaardigheid.VaardigheidID,
        });
      } else {
        gekozenVaardigheden = data.GekozenVaardigheden.filter(
          (v) => v.VaardigheidID !== action.payload.vaardigheid.VaardigheidID,
        );
      }
      data.GekozenVaardigheden = gekozenVaardigheden;

      const model = { ...state.model };
      if (!action.payload.valid) {
        newState.model = {
          ...model,
          vaardigheden: { value: undefined, status: 'INVALID' },
        };
      } else {
        newState.model = {
          ...model,
          vaardigheden: { value: undefined, status: 'VALID' },
        };
      }

      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.SET_REQUIRED_VAARDIGHEDEN: {
      const newState = { ...state };
      const data = { ...state.data };
      const gekozenVaardigheden = [...data.GekozenVaardigheden];
      action.payload.vaardigheden.map((vaardigheid: IVaardigheid) => {
        gekozenVaardigheden.push({
          VaardigheidID: vaardigheid.VaardigheidID,
        });
      });
      data.GekozenVaardigheden = gekozenVaardigheden;
      action.payload.vakvragen
        .filter(
          (vraag: IVakVraag) =>
            // Exclude 04 (Vaardigheden) and 10 Tijdschema
            vraag.VraagID !== '04' && vraag.VraagID !== '10',
        )
        .map((vraag: IVakVraag) => {
          const controlName = questionsControlsMap[vraag.VraagID];
          if (controlName !== undefined) {
            const val = newState.model[controlName].value;
            newState.model = {
              ...newState.model,
              [controlName]: {
                value: val,
                status: !vraag.Zichtbaar
                  ? 'DISABLED'
                  : val ? 'VALID' : 'INVALID',
              },
            };
          }
        });
      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.KENNISGEBIED_CHANGE: {
      const data = { ...state.data };
      const newState = { ...state };
      data.KennisgebiedenChanged = true;
      if (action.payload.checked) {
        data.GekozenKennisgebieden = [
          ...data.GekozenKennisgebieden,
          action.payload.kennisgebiedId,
        ];
      } else {
        data.GekozenKennisgebieden = data.GekozenKennisgebieden.filter(
          (kennisgebiedId: number) =>
            kennisgebiedId !== action.payload.kennisgebiedId,
        );
      }

      const model = { ...state.model };
      if (data.GekozenKennisgebieden.length === 0) {
        newState.model = {
          ...model,
          doelgroep: { value: undefined, status: 'INVALID' },
        };
      } else {
        newState.model = {
          ...model,
          doelgroep: { value: undefined, status: 'VALID' },
        };
      }

      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.SCHEME_CHANGE: {
      return {
        ...state,
        werkvormSchema: action.payload,
        werkvormSchemaChanged: true,
      };
    }

    case manageSpecialty.ATTACHMENTS_CHANGE: {
      const data = { ...state.data };
      data.BijlagenData = [...action.payload];
      data.BijlagenChanged = true;
      return {
        ...state,
        data,
      };
    }

    case manageSpecialty.SET_ACTUALITEITEN: {
      return {
        ...state,
        relevanteActualiteiten: action.payload,
      };
    }

    case manageSpecialty.SET_BEOORDELAAR: {
      const data = { ...state.data };
      const newState = { ...state };
      // Zet status aanbod op "WordtBeoordeeld".
      data.Status = 'WordtBeoordeeld';
      newState.beoordelingGewijzigdText = 'Beoordelaar toegewezen';
      const beoordeling = { ...data.Beoordeling };
      beoordeling.BeoordelingChanged = true;
      beoordeling.PersoonID = parseInt(action.payload, 10);
      data.Beoordeling = beoordeling;
      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.SET_BEOORDELING_STATUS: {
      const data = { ...state.data };
      const newState = { ...state };
      const beoordeling = { ...data.Beoordeling };
      beoordeling.BeoordelingChanged = true;
      beoordeling.Status = action.payload.Status;
      data.Beoordeling = beoordeling;
      const model = { ...state.modelJudgement };
      if (
        ['Goedgekeurd', 'Afgekeurd'].indexOf(action.payload.Status) > -1 &&
        model.rapport.value === ''
      ) {
        newState.modelJudgement = {
          ...model,
          rapport: { value: '', status: 'INVALID' },
        };
      } else {
        if (
          [undefined, '', 'CommentaarGevraagd', 'TerBeoordeling'].indexOf(
            action.payload.Status,
          ) > -1 &&
          model.rapport.value === ''
        ) {
          newState.modelJudgement = {
            ...model,
            rapport: { value: '', status: 'DISABLED' },
            beoordelingStatus: { value: action.payload },
          };
        } else {
          newState.modelJudgement = {
            ...model,
            rapport: { value: model.rapport.value, status: 'VALID' },
            beoordelingStatus: { value: action.payload },
          };
        }
      }
      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.UPLOAD_FILE_SUCCESS: {
      const data = { ...state.data };
      const newState = { ...state };

      data.BijlagenData = [
        ...data.BijlagenData,
        {
          DocumentID: action.payload.DocumentID,
          Lokatie: `${action.payload.Lokatie}/${action.payload.Naam}`,
          Naam: action.payload.Naam,
          Omschrijving: action.payload.Omschrijving,
          Status: action.payload.Status as 0 | 1 | 2 | 3,
          toggleWijzigOmschrijving: false,
        },
      ];
      data.BijlagenChanged = true;

      return {
        ...newState,
        data,
      };
    }

    case manageSpecialty.SET_VAKGROEP: {
      const data = { ...state.data };
      const newState = { ...state };
      data.VakgroepID = action.payload.vakgroepId;
      data.VakgroepNaam = action.payload.vakgroepNaam;
      const model = { ...state.model };
      newState.model = {
        ...model,
        aanbieder: {
          value: {
            VakgroepID: action.payload.vakgroepId,
            VakgroepNaam: action.payload.vakgroepNaam,
          },
          status: 'VALID',
        },
      };
      return {
        ...newState,
        data,
      };
    }

    case FormActions.UpdateValue: {
      const newState = { ...state };
      const data = { ...state.data };
      const beoordeling = { ...data.Beoordeling };
      switch (action.payload.path) {
        case 'manageSpecialty.specialty.modelJudgement.beoordelingStatus':
          const beoorderlingStatus =
            action.payload.value.beoordelingStatus.Status;
          if (beoorderlingStatus !== data.Beoordeling.Status) {
            beoordeling.BeoordelingChanged = true;
            beoordeling.Status = beoorderlingStatus;
            data.Beoordeling = beoordeling;
          }
          const model = { ...state.modelJudgement };
          if (['Goedgekeurd', 'Afgekeurd'].indexOf(beoorderlingStatus) > -1) {
            data.Status = beoorderlingStatus;
            if (model.rapport.value === '') {
              newState.modelJudgement = {
                ...model,
                rapport: { value: '', status: 'INVALID' },
              };
            }
          } else {
            if (
              [undefined, '', 'CommentaarGevraagd', 'TerBeoordeling'].indexOf(
                beoorderlingStatus,
              ) > -1 &&
              model.rapport.value === ''
            ) {
              newState.modelJudgement = {
                ...model,
                rapport: { value: '', status: 'DISABLED' },
                beoordelingStatus: { value: beoorderlingStatus },
              };
            } else {
              newState.modelJudgement = {
                ...model,
                rapport: { value: model.rapport.value, status: 'VALID' },
                beoordelingStatus: { value: beoorderlingStatus },
              };
            }
          }
          break;

        case 'manageSpecialty.specialty.modelJudgement.beoordelaar':
          data.Status = 'WordtBeoordeeld';
          if (
            beoordeling.PersoonID !==
            parseInt(action.payload.value.beoordelaar, 10)
          ) {
            newState.beoordelingGewijzigdText = 'Beoordelaar toegewezen';
            beoordeling.BeoordelingChanged = true;
            beoordeling.PersoonID = parseInt(
              action.payload.value.beoordelaar,
              10,
            );
            data.Beoordeling = beoordeling;
          }
          break;
        case 'manageSpecialty.specialty.modelJudgement.rapport':
          break;
      }

      return {
        ...newState,
        data,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getSuccess = (state: State) => state.success;

export const getEnableEditing = (state: State) => state.enableEditing;
export const getEnableEditingMain = (state: State) => state.enableEditingMain;

export const getShowComments = (state: State) => state.showComments;

export const getSpecialty = (state: State) => state.data;

export const getVakgroepID = (state: State) =>
  state.data && state.data.VakgroepID;
export const getFactuurId = (state: State) =>
  state.data && state.data.FactuurID;
export const getIsHoogleraar = (state: State) =>
  state.data && state.data.IsHoogleraar;
export const getisVakcommissieAG = (state: State) =>
  state.data && state.data.IsVakcommissieAG;
export const getVakgroepNaam = (state: State) =>
  state.data && state.data.VakgroepNaam;
export const getStatus = (state: State) => state.data && state.data.Status;
export const getTitelData = (state: State) =>
  state.data && state.data.TitelData;

export const getThemaId = (state: State) => state.data && state.data.ThemaID;

export const getCompetentieId = (state: State) =>
  state.data && state.data.CompetentieID;

export const getGekozenVaardigheden = (state: State) =>
  state.data && state.data.GekozenVaardigheden;

export const getGekozenKennisgebieden = (state: State) =>
  state.data && state.data.GekozenKennisgebieden;

export const getInhoud = (state: State) => state.data && state.data.Inhoud;
export const getGeintegreerdeGewasbescherming = (state: State) =>
  state.ggItems && state.ggItems.GeintegreerdeGewasbescherming;
export const getPreventieveMaatregelen = (state: State) =>
  state.ggItems && state.ggItems.PreventieveMaatregelen;
export const getTeelttechnischeMaatregelen = (state: State) =>
  state.ggItems && state.ggItems.TeelttechnischeMaatregelen;
export const getWaarschuwingEnAdviesSystemen = (state: State) =>
  state.ggItems && state.ggItems.WaarschuwingEnAdviesSystemen;
export const getNietChemischeMogelijkheden = (state: State) =>
  state.ggItems && state.ggItems.NietChemischeMogelijkheden;
export const getChemischeGewasbescherming = (state: State) =>
  state.ggItems && state.ggItems.ChemischeGewasbescherming;
export const getEmissieBeperking = (state: State) =>
  state.ggItems && state.ggItems.EmissieBeperking;
export const getDoelstelling = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.Doelstelling;
export const getDoelstellingS = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.DoelstellingS;
export const getDoelstellingM = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.DoelstellingM;
export const getDoelstellingA = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.DoelstellingA;
export const getDoelstellingR = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.DoelstellingR;
export const getDoelstellingT = (state: State) =>
  state.doelstellingItems && state.doelstellingItems.DoelstellingT;
export const getActualiteit = (state: State) =>
  state.data && state.data.Actualiteiten;
export const getIndividueleRelevantie = (state: State) =>
  state.data && state.data.IndividueleRelevantie;
export const getRelevanteActualiteiten = (state: State) =>
  state.relevanteActualiteiten;
export const getPromotietekst = (state: State) =>
  state.data && state.data.Promotietekst;
export const getWerkvormData = (state: State) => state.werkvormData;
export const getDocenten = (state: State) => state.data && state.data.Docenten;
export const getEvaluatieWijze = (state: State) =>
  state.data && state.data.EvaluatieWijze;
export const getMateriaal = (state: State) =>
  state.data && state.data.Materiaal;
export const getWebsite = (state: State) => state.data && state.data.Website;
export const getWerkvormSchema = (state: State) => state.werkvormSchema;
export const getPromotietekstData = (state: State) =>
  state.data && state.data.PromotietekstData;

export const getKostenPerDeelname = (state: State) =>
  state.data && state.data.KostenPerDeelname;
export const getGroepsgrootte = (state: State) =>
  state.data && state.data.Groepsgrootte;
export const getBegindatum = (state: State) =>
  state.data && state.data.Begindatum;
export const getEinddatum = (state: State) =>
  state.data && state.data.Einddatum;
export const getEnableEditingEinddatum = (state: State) =>
  state.enableEditingEinddatum;
export const getAantalSessies = (state: State) =>
  state.data && state.data.AantalSessies;
export const getTijdsduur = (state: State) =>
  state.data && state.data.Tijdsduur;
export const getDigitaalAanbod = (state: State) =>
  state.data && state.data.DigitaalAanbod;
export const getBijlagen = (state: State) =>
  state.data && state.data.BijlagenData;

export const getChangeLog = (state: State) => state.historyData;
export const getDiscussions = (state: State) => state.discussions;
export const getShowBeoordelingData = (state: State) =>
  state.showBeoordelingData;
export const getBeoordeling = (state: State) =>
  state.data && state.data.Beoordeling;
export const getCanUpdateBeoordelaar = (state: State) =>
  state.canUpdateBeoordelaar;
export const getCanUpdateBeoordeling = (state: State) =>
  state.canUpdateBeoordeling;

export const getCurrentTabIndex = (state: State) => state.tabIndex;
export const getAllControls = (state: State) => {
  return state.loaded && state.model;
};
export const getAllJudgementControls = (state: State) => {
  return state.loaded && state.modelJudgement;
};
export const getBeoordelingTabDisabled = (state: State) =>
  state.beoordelingTabDisabled;

export const getInvalidControls = (state: State) => {
  return state.invalidControls;
};

export const getTitel = (state: State) => {
  return state.model && state.model.titel && state.model.titel.value;
};

export const getShowIndienenButton = (state: State) => {
  return state.showIndienenButton;
};

export const getDatumAangemaakt = (state: State) =>
  state.data && state.data.DatumAangemaakt;

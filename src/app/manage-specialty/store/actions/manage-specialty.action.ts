import { Action } from '@ngrx/store';
import {
  IBijlagenData,
  IManageSpecialty,
  IUploadFileResponse,
  IWerkvormSchema,
} from '../../models/manage-specialty';
import { ICompetentie, IThema } from '../../models/lists';
import { IVaardigheid, IVakVraag } from '../../models/skills';

export const INITIALIZE_STATE = '[IManageSpecialty] Init state';
export const FETCH_SPECIALTY = '[IManageSpecialty] Fetch ISpecialty';
export const FETCH_SPECIALTY_SUCCESS =
  '[IManageSpecialty] Fetch ISpecialty Success';
export const FETCH_SPECIALTY_FAIL = '[IManageSpecialty] Fetch ISpecialty Fail';

// export const CREATE_SPECIALTY = '[IManageSpecialty] Create ISpecialty';
// export const CREATE_SPECIALTY_SUCCESS = '[IManageSpecialty] Create ISpecialty Success';
// export const CREATE_SPECIALTY_FAIL = '[IManageSpecialty] Create ISpecialty Fail';

export const UPDATE_SPECIALTY = '[IManageSpecialty] Update ISpecialty';
export const UPDATE_SPECIALTY_SUCCESS =
  '[IManageSpecialty] Update ISpecialty Success';
export const UPDATE_SPECIALTY_FAIL =
  '[IManageSpecialty] Update ISpecialty Fail';

export const DELETE_SPECIALTY = '[IManageSpecialty] Delete ISpecialty';
export const DELETE_SPECIALTY_SUCCESS =
  '[IManageSpecialty] Delete ISpecialty Success';
export const DELETE_SPECIALTY_FAIL =
  '[IManageSpecialty] Delete ISpecialty Fail';

export const SERIALIZE_SPECIALTY = '[IManageSpecialty] Serialize specialty';
export const SERIALIZE_SPECIALTY_SUCCESS =
  '[IManageSpecialty] Serialize success';
export const SERIALIZE_SPECIALTY_ERROR = '[IManageSpecialty] Serialize error';

export const UPDATE_FORM = '[IManageSpecialty] Update form';
export const FORM_ERRORS = '[IManageSpecialty] Form errors';
export const FORM_SUBMIT_SUCCESS = '[IManageSpecialty] Update success';
export const FORM_SUBMIT_ERROR = '[IManageSpecialty] Update error';
export const THEMA_CHANGE = '[IManageSpecialty] Thema change';
export const COMPETENTIE_CHANGE = '[IManageSpecialty] Competentie change';
export const VAARDIGHEID_CHANGE = '[IManageSpecialty] Vaardigheid change';
export const SET_REQUIRED_VAARDIGHEDEN =
  '[IManageSpecialty] Set required vaardigheden';
export const KENNISGEBIED_CHANGE = '[IManageSpecialty] Kennisgebied change';
export const SET_MODEL = '[IManageSpecialty] Set model';
export const SCHEME_CHANGE = '[IManageSpecialty] Scheme change';
export const ATTACHMENTS_CHANGE = '[IManageSpecialty] Attachments change';
export const SET_COMPETENTIES = '[IManageSpecialty] Competenties set';
export const SET_ACTUALITEITEN = '[IManageSpecialty] Actualiteiten set';
export const SET_BEOORDELAAR = '[IManageSpecialty] Beoordelaar set';
export const SET_BEOORDELING_STATUS =
  '[IManageSpecialty] Beoordeling status set';
export const SET_TAB_INDEX = '[IManageSpecialty] Tab index set';
export const SET_VAKGROEP = '[IManageSpecialty] Vakgroep set';
export const UPLOAD_FILE = '[IManageSpecialty] Upload file';
export const UPLOAD_FILE_SUCCESS = '[IManageSpecialty] Upload file success';
export const UPLOAD_FILE_FAIL = '[IManageSpecialty] Upload file fail';

export class InitializeState implements Action {
  readonly type = INITIALIZE_STATE;

  constructor() {}
}
export class FetchSpecialty implements Action {
  readonly type = FETCH_SPECIALTY;

  constructor(public vakId: number, public forPrinting: boolean) {}
}

export class UpdateForm implements Action {
  readonly type = UPDATE_FORM;

  constructor(public payload: any) {}
}

export class FormSuccessAction implements Action {
  readonly type = FORM_SUBMIT_SUCCESS;

  constructor(public payload: any) {}
}

export class FormErrorAction implements Action {
  readonly type = FORM_SUBMIT_ERROR;

  constructor(public payload: any, public error: any) {}
}

export class FetchSpecialtySuccess implements Action {
  readonly type = FETCH_SPECIALTY_SUCCESS;

  constructor(public payload: IManageSpecialty) {}
}

export class FetchSpecialtyFail implements Action {
  readonly type = FETCH_SPECIALTY_FAIL;

  constructor(public payload: string) {}
}

// export class CreateSpecialty implements Action {
//   readonly type = CREATE_SPECIALTY;
//
//   constructor(public payload: IManageSpecialty) {}
// }
//
// export class CreateSpecialtySuccess implements Action {
//   readonly type = CREATE_SPECIALTY_SUCCESS;
//
//   constructor(public payload: IManageSpecialty) {}
// }
//
// export class CreateSpecialtyFail implements Action {
//   readonly type = CREATE_SPECIALTY_FAIL;
//
//   constructor(public payload: string) {}
// }

export class SerializeSpecialty implements Action {
  readonly type = SERIALIZE_SPECIALTY;

  constructor(public payload: boolean) {}
}

export class SerializeSpecialtySuccess implements Action {
  readonly type = SERIALIZE_SPECIALTY_SUCCESS;

  constructor(public payload: IManageSpecialty) {}
}

export class SerializeSpecialtyError implements Action {
  readonly type = SERIALIZE_SPECIALTY_ERROR;

  constructor(public payload: string) {}
}

export class UpdateSpecialty implements Action {
  readonly type = UPDATE_SPECIALTY;

  constructor(public payload: IManageSpecialty) {}
}

export class UpdateSpecialtySuccess implements Action {
  readonly type = UPDATE_SPECIALTY_SUCCESS;

  constructor(public payload: Number) {}
}

export class UpdateSpecialtyFail implements Action {
  readonly type = UPDATE_SPECIALTY_FAIL;

  constructor(public payload: string) {}
}

export class DeleteSpecialty implements Action {
  readonly type = DELETE_SPECIALTY;

  constructor(public payload: IManageSpecialty) {}
}

export class DeleteSpecialtySuccess implements Action {
  readonly type = DELETE_SPECIALTY_SUCCESS;

  constructor(public payload: IManageSpecialty) {}
}

export class DeleteSpecialtyFail implements Action {
  readonly type = DELETE_SPECIALTY_FAIL;

  constructor(public payload: string) {}
}

export class ThemaChange implements Action {
  readonly type = THEMA_CHANGE;

  constructor(public payload: IThema) {}
}

export class CompetentieChange implements Action {
  readonly type = COMPETENTIE_CHANGE;

  constructor(public payload: ICompetentie) {}
}

export class VaardigheidChange implements Action {
  readonly type = VAARDIGHEID_CHANGE;

  constructor(
    public payload: {
      vaardigheid: IVaardigheid;
      checked: boolean;
      valid: boolean;
    },
  ) {}
}

export class SetRequiredVaardigheden implements Action {
  readonly type = SET_REQUIRED_VAARDIGHEDEN;

  constructor(
    public payload: { vaardigheden: IVaardigheid[]; vakvragen: IVakVraag[] },
  ) {}
}

export class SetModel implements Action {
  readonly type = SET_MODEL;

  constructor(public payload: IVakVraag[]) {}
}

export class KennisgebiedChange implements Action {
  readonly type = KENNISGEBIED_CHANGE;

  constructor(public payload: { kennisgebiedId: number; checked: boolean }) {}
}

export class SchemeChange implements Action {
  readonly type = SCHEME_CHANGE;

  constructor(public payload: IWerkvormSchema[]) {}
}

export class AttachmentsChange implements Action {
  readonly type = ATTACHMENTS_CHANGE;

  constructor(public payload: IBijlagenData[]) {}
}

export class SetCompetenties implements Action {
  readonly type = SET_COMPETENTIES;

  constructor(public payload) {}
}

export class SetActualiteiten implements Action {
  readonly type = SET_ACTUALITEITEN;

  constructor(public payload) {}
}

export class SetBeoordelaar implements Action {
  readonly type = SET_BEOORDELAAR;

  constructor(public payload) {}
}
export class SetBeoordelingStatus implements Action {
  readonly type = SET_BEOORDELING_STATUS;

  constructor(public payload: { Status: string; label: string }) {}
}

export class SetTabIndex implements Action {
  readonly type = SET_TAB_INDEX;

  constructor(public payload) {}
}
export class UploadFile implements Action {
  readonly type = UPLOAD_FILE;

  constructor(public payload: { file: any; omschrijving: string }) {}
}
export class UploadFileSuccess implements Action {
  readonly type = UPLOAD_FILE_SUCCESS;

  constructor(public payload: IUploadFileResponse) {}
}
export class UploadFileFail implements Action {
  readonly type = UPLOAD_FILE_FAIL;

  constructor(public payload: any) {}
}

export class FormErrors implements Action {
  readonly type = FORM_ERRORS;

  constructor(public payload) {}
}

export class SetVakgroep implements Action {
  readonly type = SET_VAKGROEP;

  constructor(public payload: any) {}
}

export type FetchSpecialtyActions =
  | InitializeState
  | FetchSpecialty
  | FetchSpecialtySuccess
  | FetchSpecialtyFail
  // | CreateSpecialty
  // | CreateSpecialtySuccess
  // | CreateSpecialtyFail
  | SerializeSpecialty
  | SerializeSpecialtySuccess
  | SerializeSpecialtyError
  | UpdateSpecialty
  | UpdateSpecialtySuccess
  | UpdateSpecialtyFail
  | DeleteSpecialty
  | DeleteSpecialtySuccess
  | DeleteSpecialtyFail
  | ThemaChange
  | CompetentieChange
  | VaardigheidChange
  | SetRequiredVaardigheden
  | KennisgebiedChange
  | SetModel
  | SchemeChange
  | AttachmentsChange
  | UpdateForm
  | FormSuccessAction
  | FormErrorAction
  | SetCompetenties
  | SetActualiteiten
  | SetBeoordelaar
  | SetBeoordelingStatus
  | SetVakgroep
  | FormErrors
  | SetTabIndex
  | UploadFile
  | UploadFileSuccess
  | UploadFileFail;

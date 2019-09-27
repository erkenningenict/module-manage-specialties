import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { IManageSpecialty } from '../manage-specialty/models/manage-specialty';
import { CurrentDataService } from './current-data.service';
import { ParserService } from './parser.service';
import { State } from '../manage-specialty/store/reducers/manage-specialty.reducer';
import { ISector } from '../specialties-management/models/ISpecialty';

@Injectable()
export class SpecialtyService extends HttpBaseService {
  constructor(
    http: HttpClient,
    private parserService: ParserService,
    private currentDataService: CurrentDataService,
  ) {
    super(http);
  }

  getVakken(searchCode: string): Observable<any> {
    // const date = (startDate.valueOf() / 1000) as number;

    return this.httpGet<any>(`GetVakken?zoekCode=${searchCode}`);
  }

  getLists(): Observable<any> {
    return this.httpGet<any>('GetLists');
  }

  getVak(vakID: number, forPrinting: boolean): Observable<IManageSpecialty> {
    return this.httpGet<IManageSpecialty>(
      `GetVak?vakID=${vakID}&forPrinting=${forPrinting}`,
    );
  }

  getVaardigheden(
    themaID: number,
    competentieID: number,
    specialtyDate: Date,
  ): Observable<any> {
    // specialty date is in seconds (unix time)
    const date = specialtyDate === null ? new Date() : new Date(specialtyDate);
    return this.httpGet<any>(
      `GetVaardigheden?themaID=${themaID}&competentieID=${competentieID}&specialtyDate=${date.getTime()}`,
    );
  }
  getVakKennisgebieden(vakId: number): Observable<ISector[]> {
    return this.httpGet<ISector[]>(
      `GetVakkennisgebieden?vakId=${vakId}&time=${new Date().getTime()}`,
    );
  }

  updateVak(specialty: IManageSpecialty): Observable<any> {
    return this.httpPut(`UpdateVak`, specialty);
  }

  setSpecialty(specialty): Observable<IManageSpecialty> {
    return specialty;
  }

  serializeSpecialty(
    submitSpecialty: boolean,
    manageSpecialtyState: State,
  ): Observable<IManageSpecialty> {
    // console.log('!DH! payload', submitSpecialty);
    // console.log('!DH! serialize: ', manageSpecialtyState);
    // const formValue = payload.formValue;
    const state: State = { ...manageSpecialtyState };
    if (submitSpecialty) {
      state.submitSpecialty = submitSpecialty;
      const data = { ...state.data };
      data.CreateFactuur = true;
      data.Status = 'Ingediend';
      state.data = data;
    }

    this.currentDataService.setUserName(state.data.CurrentUserName);
    this.currentDataService.setCurrentDate(new Date());

    // const commentList = getCommentListFromFormValue(formValue);
    // const data: IManageSpecialty = { ...state.data };
    const commentList = this.parserService.getCommentsFromModelValue(state);
    state.data = commentList;
    // const data: IManageSpecialty = {...state.data};

    // data.Commentaren = commentList;
    const completeData = this.parserService.getDataFromModelValue(state);
    // const completeData = {} as IManageSpecialty;
    // console.log('!DH! newData', newData);
    if (
      completeData.Beoordeling.Status === 'Goedgekeurd' ||
      completeData.Beoordeling.Status === 'Afgekeurd'
    ) {
      completeData.Status = completeData.Beoordeling.Status;
      completeData.GewijzigdActie = completeData.Status;
    }
    return of(completeData);
  }

  uploadFile(file: any, omschrijving: string): Observable<any> {
    // Send file as multipart/form-data
    const formData = new FormData();
    formData.append('Omschrijving', omschrijving);
    formData.append('file', file);
    return this.httpPost(`UploadDocument`, formData);
  }

  deleteVak(vakId: string): Observable<any> {
    return this.httpDelete(
      `/DeleteVak?vakID=${vakId}&i=${new Date().getTime()}`,
    );
  }

  revokeVak(vakId: string): Observable<any> {
    return this.httpPut(
      `/RevokeVak?vakID=${vakId}&i=${new Date().getTime()}`,
      {},
    );
  }
}

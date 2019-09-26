import { Injectable } from '@angular/core';

@Injectable()
export class CurrentDataService {
  private currentUserName = '';
  private currentDate: Date;

  public setUserName(userName: string): void {
    this.currentUserName = userName;
  }

  public getUserName(): string {
    return this.currentUserName;
  }

  public setCurrentDate(date: Date): void {
    this.currentDate = date;
  }

  public getCurrentDate(): Date {
    return this.currentDate;
  }
}

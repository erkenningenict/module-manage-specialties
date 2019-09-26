import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store/index';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// import { form, NgrxFormModule } from 'ngrx-form';
import { form } from './store/reducers/form.reducer';
// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [form, storeFreeze]
  : [form];

// bootstrap
import { AppComponent } from './containers/app/app.component';
import { ParserService } from '../services/parser.service';
import { CurrentDataService } from '../services/current-data.service';
import { GrowlModule } from 'primeng/growl';
import {
  LocationStrategy,
  HashLocationStrategy,
  registerLocaleData,
} from '@angular/common';
import localeNl from '@angular/common/locales/nl';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'specialties' },
  {
    path: 'specialties',
    loadChildren:
      '../specialties-management/specialties-management.module#SpecialtiesManagementModule',
  },
  {
    path: 'manage-specialty',
    loadChildren:
      '../manage-specialty/manage-specialty.module#ManageSpecialtyModule',
  },
];

registerLocaleData(localeNl);

@NgModule({
  imports: [
    BrowserModule,
    GrowlModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    // environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-NL' },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    ParserService,
    CurrentDataService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

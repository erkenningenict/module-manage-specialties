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

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, effects, CustomSerializer } from './store/index';

// import { form, NgrxFormModule } from 'ngrx-form';
import { form } from './store/reducers/form.reducer';
// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [form]
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
    loadChildren: () =>
      import('../specialties-management/specialties-management.module').then(
        (m) => m.SpecialtiesManagementModule,
      ),
  },
  {
    path: 'manage-specialty',
    loadChildren: () =>
      import('../manage-specialty/manage-specialty.module').then(
        (m) => m.ManageSpecialtyModule,
      ),
  },
];

registerLocaleData(localeNl);

@NgModule({
  imports: [
    BrowserModule,
    GrowlModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
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
  entryComponents: [AppComponent],
})
export class AppModule {
  ngDoBootstrap(app: any) {
    const bootEl = document.querySelector('#module-manage-specialties');
    const componentElement = document.createElement('be-root');
    bootEl.appendChild(componentElement);
    // bootstrap the application with the selected component
    app.bootstrap(AppComponent);
  }
}

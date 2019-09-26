import { NgModule, LOCALE_ID } from '@angular/core';

import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
/**
 * Third party modules
 */
import {
  DataTableModule,
  SharedModule,
  DropdownModule,
  MultiSelectModule,
  ButtonModule,
  DialogModule,
  TooltipModule,
  GrowlModule,
  PanelModule,
  CheckboxModule,
  InputTextModule,
  ProgressSpinnerModule,
  BlockUIModule,
} from 'primeng/primeng';
import { SpecialtiesManagementComponent } from './containers/list/specialties-management.component';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { ApiErrorService } from '../services/api-error.service';
import { SpecialtyService } from '../services/specialty.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { SpecialtyEffects } from './store/effects/specialty.effects';
import { ListEffects } from './store/effects/list.effects';
import { PrintDialogContainerComponent } from './containers/print-dialog-container/print-dialog-container.component';
import { PrintSpecialtyInformationComponent } from './components/print-specialty-information/print-specialty-information.component';
import { ConcatenateListPipe } from './components/print-specialty-information/contact-list.pipe';
import { PrintSpecialtyContentComponent } from './components/print-specialty-content/print-specialty-content.component';
import { LoaderComponentModule } from '../shared/components/loader/loader.component.module';
import { PrintDiscussionComponent } from './components/print-discussion/print-discussion.component';
import { CommentHistoryComponentModule } from '../shared/components/comment-history/comment-history.component.module';
import { ActionDialogContainerComponent } from './containers/action-dialog-container/action-dialog-container.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // primeng
    ButtonModule,
    CheckboxModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    MultiSelectModule,
    BlockUIModule,
    DialogModule,
    PanelModule,
    ProgressSpinnerModule,
    LoaderComponentModule,
    CommentHistoryComponentModule,
    SharedModule,
    TooltipModule,
    RouterModule.forChild([
      { path: '', component: SpecialtiesManagementComponent },
      // {
      //   path: ':id',
      //   component: ViewBookPageComponent,
      //   canActivate: [BookExistsGuard],
      // },
      // { path: '', component: CollectionPageComponent },
    ]),
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('specialties', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([SpecialtyEffects, ListEffects]),
  ],
  declarations: [
    SpecialtiesManagementComponent,
    SearchComponent,
    TableComponent,
    PrintDialogContainerComponent,
    PrintSpecialtyInformationComponent,
    PrintSpecialtyContentComponent,
    PrintDiscussionComponent,
    ActionDialogContainerComponent,
    ConcatenateListPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'nl' },
    ApiErrorService,
    SpecialtyService,
  ],
})
export class SpecialtiesManagementModule {}

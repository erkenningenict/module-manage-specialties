import { NgModule, LOCALE_ID } from '@angular/core';

/**
 * Third party modules
 */

import { DropdownModule } from 'primeng/dropdown';
import { SpecialtyEditComponent } from './containers/specialty-edit.component';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { ApiErrorService } from '../services/api-error.service';
import { SpecialtyService } from '../services/specialty.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { TitleDisplayComponent } from './components/title-display/title-display.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { HeaderDisplayComponent } from './components/header-display/header-display.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionHistoryComponent } from './components/question-history/question-history.component';
import { ThemeComponent } from './components/theme/theme.component';
import { CompetenceComponent } from './components/competence/competence.component';
import { SkillSetComponent } from './components/skill-set/skill-set.component';
import { SectorsComponent } from './components/sectors/sectors.component';
import { QuestionContainerComponent } from './components/question-container/question-container.component';
import { CommentComponent } from './components/comment/comment.component';
import { ParserService } from '../services/parser.service';
import { CurrentDataService } from '../services/current-data.service';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { TextAreaAutosizeDirective } from './directives/text-area-autosize.directive';
import { SubQuestionContainerComponent } from './components/sub-question-container/sub-question-container.component';
import { ActualitiesComponent } from './components/actualities/actualities.component';
import { FilterActualiteitenByOnderwerpPipe } from './components/actualities/filter-actualiteiten-by-onderwerp.pipe';
import { WorkFormSchemaComponent } from './components/work-form-schema/work-form-schema.component';
import { WorkFormSchemaItemComponent } from './components/work-form-schema-item/work-form-schema-item.component';
import { OtherInfoComponent } from './components/other-info/other-info.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { FilterDeletedAttachmentsPipe } from './components/attachments/filter-deleted-attachments.pipe';
import { JudgementComponent } from './components/judgement/judgement.component';
import { CompletenessComponent } from './components/completeness/completeness.component';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';
import { QuestionValueComponent } from './components/question-value/question-value.component';
// import { NgrxFormModule } from 'ngrx-form';
import { BeNgrxFormDirective } from './directives/be-ngrx-form.directive';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { ChangeLogItemComponent } from './components/change-log-item/change-log-item.component';
import { CommentTextComponent } from './components/comment-text/comment-text.component';
import { LoaderComponentModule } from '../shared/components/loader/loader.component.module';
import { CommentHistoryComponentModule } from '../shared/components/comment-history/comment-history.component.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { TableModule } from 'primeng/table';
import {
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DialogModule,
  InputTextModule,
  BlockUIModule,
  InputTextareaModule,
  MultiSelectModule,
  PanelModule,
  ProgressSpinnerModule,
  SharedModule,
  TooltipModule,
  TabViewModule,
  FileUploadModule,
} from 'primeng/primeng';
import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // primeng
    ButtonModule,
    CalendarModule,
    TableModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    BlockUIModule,
    InputTextareaModule,
    MultiSelectModule,
    PanelModule,
    ProgressSpinnerModule,
    SharedModule,
    TooltipModule,
    TabViewModule,
    FileUploadModule,
    OverlayPanelModule,
    TextareaAutosizeModule,
    LoaderComponentModule,
    CommentHistoryComponentModule,
    // NgrxFormModule,
    RouterModule.forChild([
      { path: ':vakId', component: SpecialtyEditComponent },
      // {
      //   path: ':id',
      //   component: ViewBookPageComponent,
      //   canActivate: [BookExistsGuard],
      // },
      // { path: '', component: CollectionPageComponent },
    ]),
    StoreModule.forFeature('manageSpecialty', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    SpecialtyEditComponent,
    TitleDisplayComponent,
    ChangeLogComponent,
    ChangeLogItemComponent,
    CommentTextComponent,
    OrganizationComponent,
    HeaderDisplayComponent,
    QuestionComponent,
    QuestionValueComponent,
    QuestionHistoryComponent,
    ThemeComponent,
    CompetenceComponent,
    SkillSetComponent,
    SectorsComponent,
    QuestionContainerComponent,
    SubQuestionContainerComponent,
    CommentComponent,
    TextAreaAutosizeDirective,
    ActualitiesComponent,
    FilterActualiteitenByOnderwerpPipe,
    FilterDeletedAttachmentsPipe,
    WorkFormSchemaComponent,
    WorkFormSchemaItemComponent,
    OtherInfoComponent,
    AttachmentsComponent,
    JudgementComponent,
    InvoiceComponent,
    CompletenessComponent,
    BeNgrxFormDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'nl' },
    ApiErrorService,
    CurrentDataService,
    ParserService,
    SpecialtyService,
  ],
})
export class ManageSpecialtyModule {}

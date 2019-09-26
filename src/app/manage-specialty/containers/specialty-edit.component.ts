import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {
  IBeoordeling,
  IBijlagenData,
  IGekozenVaardigheid,
  IHistoryObject,
  IManageSpecialty,
  IWerkvormSchema,
} from '../models/manage-specialty';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICompetentie,
  IThema,
  IVakgroep,
  IKennisgebied,
  IActualiteit,
  IBeoordelaar,
} from '../models/lists';
import 'rxjs/add/observable/combineLatest';
import { IVaardigheid, IVakVraag } from '../models/skills';
import 'rxjs/add/operator/debounceTime';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'be-specialty-edit-management',
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyEditComponent implements OnInit, OnDestroy {
  loading: boolean;
  loaded$: Observable<boolean>;

  data: IManageSpecialty;
  isHoogleraar$: Observable<boolean>;
  isVakcommissieAG$: Observable<boolean>;
  status$: Observable<string>;
  vakgroepen$: Observable<IVakgroep[]>;
  vakgroepId$: Observable<number>;
  vakgroepNaam$: Observable<string>;
  titel$: Observable<string>;
  titelData$: Observable<string>;
  promotietekst$: Observable<string>;
  promotietekstData$: Observable<string>;
  themas$: Observable<IThema[]>;
  competenties$: Observable<ICompetentie[]>;
  kennisgebieden$: Observable<IKennisgebied[]>;
  enableEditing: boolean;
  enableEditingMain: boolean;
  showComments: boolean;
  geldigeCompetentiesPerThema$: Observable<ICompetentie[]>;
  competentieId$: Observable<number>;
  inhoud$: Observable<string>;
  geintegreerdeGewasbescherming$: Observable<string>;
  preventieveMaatregelen$: Observable<string>;
  teelttechnischeMaatregelen$: Observable<string>;
  waarschuwingEnAdviesSystemen$: Observable<string>;
  nietChemischeMogelijkheden$: Observable<string>;
  chemischeGewasbescherming$: Observable<string>;
  emissieBeperking$: Observable<string>;
  doelstelling$: Observable<string>;
  doelstellingS$: Observable<string>;
  doelstellingM$: Observable<string>;
  doelstellingA$: Observable<string>;
  doelstellingR$: Observable<string>;
  doelstellingT$: Observable<string>;
  actualiteit$: Observable<string>;
  individueleRelevantie$: Observable<string>;
  werkvormData$: Observable<string>;
  werkvormSchema$: Observable<IWerkvormSchema[]>;
  docenten$: Observable<string>;
  evaluatieWijze$: Observable<string>;
  materiaal$: Observable<string>;
  kostenPerDeelname$: Observable<number>;
  groepsgrootte$: Observable<number>;
  begindatum$: Observable<Date>;
  einddatum$: Observable<Date>;
  enableEditingEinddatum$: Observable<boolean>;
  aantalSessies$: Observable<number>;
  tijdsduur$: Observable<string>;
  digitaalAanbod$: Observable<boolean>;
  bijlagen$: Observable<IBijlagenData[]>;
  website$: Observable<string>;
  skills$: Observable<IVaardigheid[]>;
  relevanteActualiteiten$: Observable<IActualiteit[]>;
  gekozenVaardigheden$: Observable<IGekozenVaardigheid[]>;
  gekozenKennisgebieden$: Observable<number[]>;
  beoordelaars$: Observable<IBeoordelaar[]>;
  showBeoordelingData$: Observable<boolean>;
  beoordeling$: Observable<IBeoordeling>;
  canUpdateBeoordelaar$: Observable<boolean>;
  canUpdateBeoordeling$: Observable<boolean>;
  discussions: any;
  invoiceId$: Observable<number>;
  vakvragen: IVakVraag[];

  beoordelingTabDisabled$: Observable<boolean>;
  currentTabIndex = 0;
  allControls$: Observable<any>;
  allJudgementControls$: Observable<any>;
  invalidControls: string[];
  nrOfControls = 0;
  currentThemaId = 0;
  currentCompetenceId = 0;
  saveDisabled = false;
  submitDisabled = false;
  changeLog: IHistoryObject[];
  showChangelog = false;
  showIndienenButton$: Observable<boolean>;
  themaId: number;

  private destroy$ = new Subject<null>();

  constructor(
    private store: Store<fromStore.ManageSpecialtyState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.store
      .select(fromStore.getManageSpecialtyItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.data = data));

    this.store
      .select(fromStore.getManageSpecialtyLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => (this.loading = loading));

    this.store
      .select(fromStore.getError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: any) => {
        if (error) {
          this.messageService.add({
            summary: 'Fout opgetreden',
            detail: error.Message,
            severity: 'error',
          });
        }
      });
    this.store
      .select(fromStore.getSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((success: boolean) => {
        if (success) {
          this.messageService.add({
            summary: 'Wijzigingen opslagen',
            detail: 'Aanbod succesvol opgeslagen',
            severity: 'success',
          });
        }
      });

    this.loaded$ = this.store.select(fromStore.getManageSpecialtyLoaded);
    this.vakgroepen$ = this.store.select(fromStore.getVakgroepen);
    this.status$ = this.store.select(fromStore.getStatus);
    this.vakgroepId$ = this.store.select(fromStore.getVakgroepId);
    this.invoiceId$ = this.store.select(fromStore.getFactuurId);
    this.isHoogleraar$ = this.store.select(fromStore.getIsHoogleraar);
    this.isVakcommissieAG$ = this.store.select(fromStore.getisVakcommissieAG);
    this.vakgroepNaam$ = this.store.select(fromStore.getVakgroepNaam);
    this.titel$ = this.store.select(fromStore.getTitel);
    this.titelData$ = this.store.select(fromStore.getTitelData);
    this.promotietekst$ = this.store.select(fromStore.getPromotietekst);
    this.promotietekstData$ = this.store.select(fromStore.getPromotietekstData);

    this.themas$ = this.store.select(fromStore.getThemas);
    this.competenties$ = this.store.select(fromStore.getCompetenties);
    this.store
      .select(fromStore.getEnableEditing)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (enableEditing: boolean) => (this.enableEditing = enableEditing),
      );
    this.store
      .select(fromStore.getEnableEditingMain)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (enableEditingMain: boolean) =>
          (this.enableEditingMain = enableEditingMain),
      );
    this.store
      .select(fromStore.getShowComments)
      .pipe(takeUntil(this.destroy$))
      .subscribe((showComments: boolean) => (this.showComments = showComments));
    this.geldigeCompetentiesPerThema$ = this.store.select(
      fromStore.getGeldigeCompetentiesPerThema,
    );
    this.store
      .select(fromStore.getThemaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((themaId: number) => (this.themaId = themaId));
    this.competentieId$ = this.store.select(fromStore.getCompetentieId);
    this.skills$ = this.store.select(fromStore.getSkills);
    this.gekozenVaardigheden$ = this.store.select(
      fromStore.getGekozenVaardigheden,
    );
    this.kennisgebieden$ = this.store.select(fromStore.getKennisgebieden);
    this.gekozenKennisgebieden$ = this.store.select(
      fromStore.getGekozenKennisgebieden,
    );
    this.inhoud$ = this.store.select(fromStore.getInhoud);
    this.geintegreerdeGewasbescherming$ = this.store.select(
      fromStore.getGeintegreerdeGewasbescherming,
    );
    this.preventieveMaatregelen$ = this.store.select(
      fromStore.getPreventieveMaatregelen,
    );
    this.teelttechnischeMaatregelen$ = this.store.select(
      fromStore.getTeelttechnischeMaatregelen,
    );
    this.waarschuwingEnAdviesSystemen$ = this.store.select(
      fromStore.getWaarschuwingEnAdviesSystemen,
    );
    this.nietChemischeMogelijkheden$ = this.store.select(
      fromStore.getNietChemischeMogelijkheden,
    );
    this.chemischeGewasbescherming$ = this.store.select(
      fromStore.getChemischeGewasbescherming,
    );
    this.emissieBeperking$ = this.store.select(fromStore.getEmissieBeperking);
    this.doelstelling$ = this.store.select(fromStore.getDoelstelling);
    this.doelstellingS$ = this.store.select(fromStore.getDoelstellingS);
    this.doelstellingM$ = this.store.select(fromStore.getDoelstellingM);
    this.doelstellingA$ = this.store.select(fromStore.getDoelstellingA);
    this.doelstellingR$ = this.store.select(fromStore.getDoelstellingR);
    this.doelstellingT$ = this.store.select(fromStore.getDoelstellingT);
    this.actualiteit$ = this.store.select(fromStore.getActualiteit);
    this.werkvormData$ = this.store.select(fromStore.getWerkvormData);
    this.werkvormSchema$ = this.store.select(fromStore.getWerkvormSchema);
    this.docenten$ = this.store.select(fromStore.getDocenten);
    this.evaluatieWijze$ = this.store.select(fromStore.getEvaluatieWijze);
    this.materiaal$ = this.store.select(fromStore.getMateriaal);
    this.kostenPerDeelname$ = this.store.select(fromStore.getKostenPerDeelname);
    this.groepsgrootte$ = this.store.select(fromStore.getGroepsgrootte);
    this.begindatum$ = this.store.select(fromStore.getBegindatum);
    this.einddatum$ = this.store.select(fromStore.getEinddatum);
    this.enableEditingEinddatum$ = this.store.select(
      fromStore.getEnableEditingEinddatum,
    );
    this.aantalSessies$ = this.store.select(fromStore.getAantalSessies);
    this.tijdsduur$ = this.store.select(fromStore.getTijdsduur);
    this.digitaalAanbod$ = this.store.select(fromStore.getDigitaalAanbod);
    this.bijlagen$ = this.store.select(fromStore.getBijlagen);
    this.website$ = this.store.select(fromStore.getWebsite);
    this.individueleRelevantie$ = this.store.select(
      fromStore.getIndividueleRelevantie,
    );
    this.relevanteActualiteiten$ = this.store.select(
      fromStore.getRelevanteActualiteiten,
    );
    this.beoordelaars$ = this.store.select(fromStore.getBeoordelaars);
    this.showBeoordelingData$ = this.store.select(
      fromStore.getShowBeoordelingData,
    );
    this.beoordeling$ = this.store.select(fromStore.getBeoordeling);
    this.canUpdateBeoordelaar$ = this.store.select(
      fromStore.getCanUpdateBeoordelaar,
    );
    this.canUpdateBeoordeling$ = this.store.select(
      fromStore.getCanUpdateBeoordeling,
    );
    this.store
      .select(fromStore.getDiscussions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((discussions) => (this.discussions = discussions));

    this.store
      .select(fromStore.getCurrentTabIndex)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (currentTabIndex: number) => (this.currentTabIndex = currentTabIndex),
      );

    this.allControls$ = this.store.select(fromStore.getAllControls);
    this.allJudgementControls$ = this.store.select(
      fromStore.getAllJudgementControls,
    );
    this.store
      .select(fromStore.getChangeLog)
      .pipe(takeUntil(this.destroy$))
      .subscribe((changeLog: IHistoryObject[]) => (this.changeLog = changeLog));

    this.showIndienenButton$ = this.store.select(
      fromStore.getShowIndienenButton,
    );

    Observable.combineLatest(
      this.store.select(fromStore.getAllControls),
      this.store.select(fromStore.getAllJudgementControls),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(([controls, judgementControls]) => {
        const keys = Object.keys(controls);
        const judgmentKeys = Object.keys(judgementControls);
        this.nrOfControls = judgmentKeys.length + keys.length;
        let disabled = false;
        this.invalidControls = [];
        keys.map((key: any) => {
          if (
            controls[key].status &&
            (controls[key].status === 'INVALID' ||
              (controls[key].status !== 'DISABLED' &&
                controls[key].value === ''))
          ) {
            const nice = key.replace(/([a-z])([A-Z])/g, '$1 $2');
            this.invalidControls.push(nice.toLowerCase());
            disabled = true;
          }
        });
        judgmentKeys.map((judgementKey: any) => {
          if (
            judgementControls[judgementKey].status &&
            (judgementControls[judgementKey].status === 'INVALID' ||
              (judgementControls[judgementKey].status !== 'DISABLED' &&
                judgementControls[judgementKey].value === ''))
          ) {
            const nice = judgementKey.replace(/([a-z])([A-Z])/g, '$1 $2');
            this.invalidControls.push(nice.toLowerCase());
            disabled = true;
          }
        });

        this.saveDisabled = false;
        this.submitDisabled = disabled && this.data.VakID !== 0;
      });
    this.store
      .select(fromStore.getVakVragen)
      .pipe(takeUntil(this.destroy$))
      .subscribe((vakvragen) => {
        this.vakvragen = vakvragen;
        this.nrOfControls = vakvragen.filter(
          (vakVraag: IVakVraag) => vakVraag.Zichtbaar,
        ).length;
      });

    this.beoordelingTabDisabled$ = this.store.select(
      fromStore.getBeoordelingTabDisabled,
    );
  }

  ngOnInit() {
    const { vakId } = this.activatedRoute.snapshot.params;
    this.store.dispatch(new fromStore.FetchSpecialty(vakId, false));
    this.store.dispatch(new fromStore.LoadLists());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save(submitSpecialty: boolean) {
    this.store.dispatch(new fromStore.SerializeSpecialty(submitSpecialty));
  }

  toOverview() {
    this.router.navigate(['specialties']);
  }

  onThemaChange(event: IThema) {
    this.store.dispatch(new fromStore.ThemaChange(event));
  }

  onCompetentieChange(event: ICompetentie) {
    this.store.dispatch(new fromStore.CompetentieChange(event));
  }

  onVaardigheidChecked(event: {
    vaardigheid: IVaardigheid;
    checked: boolean;
    valid: boolean;
  }) {
    this.store.dispatch(new fromStore.VaardigheidChange(event));
  }

  onKennisgebiedChecked(event: { kennisgebiedId: number; checked: boolean }) {
    this.store.dispatch(new fromStore.KennisgebiedChange(event));
  }

  onEditScheme(event: IWerkvormSchema[]) {
    this.store.dispatch(new fromStore.SchemeChange(event));
  }

  onUpdatedAttachments(event: IBijlagenData[]) {
    console.log('!DH! specialty updated attachments', event);
    this.store.dispatch(new fromStore.AttachmentsChange(event));
  }

  onUpdateBeoordelaar(event: number) {
    this.store.dispatch(new fromStore.SetBeoordelaar(event));
  }

  onUpdateBeoordelingStatus(event: { Status: string; label: string }) {
    this.store.dispatch(new fromStore.SetBeoordelingStatus(event));
  }

  onUploadFile(event: { file: any; omschrijving: string }) {
    this.store.dispatch(new fromStore.UploadFile(event));
  }

  getTitle(questionId: string): string {
    return this.getVakvraag(questionId).Titel;
  }

  getDescription(questionId: string): string {
    return this.getVakvraag(questionId).Omschrijving;
  }

  getVisibility(questionId: string): boolean {
    return this.getVakvraag(questionId).Zichtbaar;
  }

  toggleChangelog() {
    this.showChangelog = !this.showChangelog;
  }

  getVakvraag(questionId: string): IVakVraag | undefined {
    if (this.vakvragen === null) {
      return {
        Titel: '',
        Omschrijving: '',
        Zichtbaar: true,
      } as IVakVraag;
    }
    const vakvraag = this.vakvragen.find((val) => val.VraagID === questionId);
    if (!vakvraag) {
      return {
        Titel: 'Nog niet bekend',
        Omschrijving: 'Kies eerst een thema en competentie',
        Zichtbaar: true,
      } as IVakVraag;
    }
    return vakvraag;
  }

  handleTabIndexChange(event) {
    this.store.dispatch(new fromStore.SetTabIndex(event.index));
  }
}

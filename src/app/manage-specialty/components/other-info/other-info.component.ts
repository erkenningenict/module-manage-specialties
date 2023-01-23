import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as parse from 'date-fns/parse';

@Component({
  selector: 'be-other-info',
  templateUrl: './other-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherInfoComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() enableEditing: boolean;
  @Input() maxLength = 2000;
  @Input() tabIndex: number;
  @Input() currentTabIndex: number;
  @Input() kostenPerDeelname: number;
  @Input() groepsgrootte: number;
  @Input() begindatum: Date;
  @Input() einddatum: Date;
  @Input() enableEditingEinddatum = true;
  @Input() aantalSessies: number;
  @Input() tijdsduur: string;
  @Input() digitaalAanbod: boolean;
  minDate: Date = new Date(2014, 0, 1);
  einddatumDate: Date;
  nl: any;

  formKostenPerDeelname: FormGroup = new FormGroup({});
  formGroepsgrootte: FormGroup = new FormGroup({});
  formEinddatum: FormGroup = new FormGroup({});
  formAantalSessies: FormGroup = new FormGroup({});
  formTijdsduur: FormGroup = new FormGroup({});
  formDigitaalAanbod: FormGroup = new FormGroup({});

  // autoResize: boolean = true;
  constructor(private formBuilder: FormBuilder) {
    this.initFormModel();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    // this.einddatumDate = parse(this.einddatum);
    this.setValues();
  }

  ngOnInit() {
    this.nl = {
      firstDayOfWeek: 1,
      dayNames: [
        'Zondag',
        'Maandag',
        'Dinsdag',
        'Woensdag',
        'Donderdag',
        'Vrijdag',
        'Zaterdag',
      ],
      dayNamesShort: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vrij', 'Zat'],
      dayNamesMin: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
      monthNames: [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Maa',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      today: 'Vandaag',
      clear: 'Leeg',
    };
  }

  private initFormModel() {
    this.formKostenPerDeelname = this.formBuilder.group({
      kostenPerDeelname: [
        this.kostenPerDeelname &&
          this.kostenPerDeelname.toLocaleString('nl-NL', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        Validators.required,
      ],
    });
    this.formGroepsgrootte = this.formBuilder.group({
      groepsgrootte: [undefined, Validators.required],
    });
    this.formEinddatum = this.formBuilder.group({
      einddatum: [undefined, Validators.required],
    });
    this.formAantalSessies = this.formBuilder.group({
      aantalSessies: [undefined, Validators.required],
    });
    this.formTijdsduur = this.formBuilder.group({
      tijdsduur: [undefined, Validators.required],
    });
    this.formDigitaalAanbod = this.formBuilder.group({
      digitaalAanbod: [false, Validators.required],
    });
  }

  private setValues() {
    // this.formKostenPerDeelname.controls.kostenPerDeelname.setValue(
    //   this.kostenPerDeelname &&
    //     this.kostenPerDeelname.toLocaleString('nl-NL', {
    //       minimumFractionDigits: 2,
    //       maximumFractionDigits: 2,
    //     }),
    //   {
    //     emitEvent: false,
    //   },
    // );
    // this.formGroepsgrootte.controls.groepsgrootte.setValue(this.groepsgrootte, {
    //   emitEvent: false,
    // });
    // this.formEinddatum.controls.einddatum.setValue(this.einddatumDate, {
    //   emitEvent: false,
    // });
    // this.formAantalSessies.controls.aantalSessies.setValue(this.aantalSessies, {
    //   emitEvent: false,
    // });
    // this.formTijdsduur.controls.tijdsduur.setValue(this.tijdsduur, {
    //   emitEvent: false,
    // });
    // this.formDigitaalAanbod.controls.digitaalAanbod.setValue(
    //   this.digitaalAanbod,
    //   {
    //     emitEvent: false,
    //   },
    // );

    if (this.enableEditingEinddatum) {
      this.formEinddatum.controls.einddatum.enable();
    } else {
      this.formEinddatum.controls.einddatum.disable();
    }

    if (this.enableEditing) {
      this.formGroepsgrootte.controls.groepsgrootte.enable();
      this.formAantalSessies.controls.aantalSessies.enable();
      this.formTijdsduur.controls.tijdsduur.enable();
      this.formDigitaalAanbod.controls.digitaalAanbod.enable();
    } else {
      this.formGroepsgrootte.controls.groepsgrootte.disable();
      this.formAantalSessies.controls.aantalSessies.disable();
      this.formTijdsduur.controls.tijdsduur.disable();
      this.formDigitaalAanbod.controls.digitaalAanbod.disable();
    }
    // rector may edit groepsgrootte en digitaalAanbod
    if (this.enableEditingEinddatum) {
      this.formGroepsgrootte.controls.groepsgrootte.enable();
      this.formDigitaalAanbod.controls.digitaalAanbod.enable();
    }
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IBeoordelaar } from '../../models/lists';
import { IBeoordeling } from '../../models/manage-specialty';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'be-judgement',
  templateUrl: './judgement.component.html',
  styleUrls: ['./judgement.component.scss'],
})
export class JudgementComponent implements OnInit, OnChanges {
  @Input() enableEditing: boolean;
  @Input() judges: IBeoordelaar[];
  @Input() showBeoordelingData: boolean;
  @Input() beoordeling: IBeoordeling;
  @Input() canUpdateBeoordelaar: boolean;
  @Input() canUpdateBeoordeling: boolean;
  @Output()
  updateBeoordelaar: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  updateBeoordeling: EventEmitter<number> = new EventEmitter<number>();

  beoordelaarNaam: string;

  beoordelingRapportRequired = false;
  beoordelingStatusRequired = false;
  formBeoordelaar: FormGroup = this.formBuilder.group({});
  formStatus: FormGroup = this.formBuilder.group({});
  formRapport: FormGroup = this.formBuilder.group({});
  statusItems: any[] = [
    { Status: 'TerBeoordeling', label: 'Ter beoordeling' },
    { Status: 'CommentaarGevraagd', label: 'Commentaar gevraagd' },
    { Status: 'Goedgekeurd', label: 'Goedgekeurd' },
    { Status: 'Afgekeurd', label: 'Afgekeurd' },
  ];
  initDone = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initDone = true;
  }

  ngOnChanges() {
    // console.log('!DH! beoordeling', this.beoordeling);
    // if (!this.beoordeling) {
    //   return;
    // }
    if (
      this.beoordeling &&
      (this.beoordeling.Status === 'TerBeoordeling' ||
        this.beoordeling.Status === 'CommentaarGevraagd')
    ) {
      this.beoordelingRapportRequired = false;
      this.beoordelingStatusRequired = false;
    } else {
      this.beoordelingRapportRequired = true;
      this.beoordelingStatusRequired = true;
      if (this.initDone) {
        this.formRapport.controls.rapport.enable();
      }
    }
    this.getBeoordelaarNaam();
  }

  initForm() {
    this.formBeoordelaar.registerControl(
      'beoordelaar',
      new FormControl(undefined, [Validators.required]),
    );

    this.formStatus.registerControl(
      'beoordelingStatus',
      new FormControl(undefined, [
        this.beoordelingStatusRequired
          ? Validators.required
          : Validators.required,
      ]),
    );

    this.formRapport.registerControl(
      'rapport',
      new FormControl(undefined, [Validators.required]),
    );

    if (!this.beoordelingRapportRequired) {
      this.formRapport.controls.rapport.setValidators(null);
      this.formRapport.controls.rapport.updateValueAndValidity();
    }

    if (!this.beoordelingStatusRequired) {
      this.formStatus.controls.beoordelingStatus.disable();
    }

    // if (this.canUpdateBeoordelaar) {
    //   this.formBeoordeling = new FormGroup({
    //     beoordelaar: new FormControl(undefined, [
    //       Validators.required,
    //     ]),
    //   });
    // }
    // if (this.beoordeling && this.canUpdateBeoordeling) {
    //   this.formBeoordeling = new FormGroup({
    //     status: new FormControl(undefined, [
    //       this.beoordelingStatusRequired ? Validators.required : undefined,
    //     ]),
    //     rapport: new FormControl(undefined, [
    //       this.beoordelingRapportRequired ? Validators.required : undefined,
    //     ]),
    //   });

    // Object.keys(this.formBeoordeling.controls).forEach((control: string) => {
    //   if (this.enableEditing) {
    //     this.formBeoordeling.controls[control].enable();
    //   } else {
    //     this.formBeoordeling.controls[control].disable();
    //   }
    // });
    // this.formBeoordeling.controls.status.valueChanges.subscribe((form) => {
    //   this.updateBeoordeling.emit(form.Status);
    // });
    // }

    // this.parentForm.setControl('formBeoordeling', this.formBeoordeling);
    if (this.formBeoordelaar.controls.hasOwnProperty('beoordelaar')) {
      // this.formBeoordelaar.controls.beoordelaar.valueChanges.subscribe(
      //   (beoordelaar) => {
      //     if (beoordelaar) {
      //       this.updateBeoordelaar.emit(beoordelaar);
      //     }
      //   },
      // );
    }

    if (
      !this.initDone &&
      this.formStatus.controls.hasOwnProperty('beoordelingStatus')
    ) {
      // this.formStatus.controls.beoordelingStatus.valueChanges.subscribe(
      //   (status) => {
      //     if (this.beoordeling && this.beoordeling.Status !== status.Status) {
      //       this.updateStatus.emit(status);
      //     }
      //   },
      // );
    }

    // this.formBeoordeling.valueChanges.debounceTime(500).subscribe((value) => {
    //   const formError: IFormErrors = {
    //     controlName: 'beoordelaar',
    //     errors: this.formBeoordeling.controls.beoordelaar.errors,
    //   };
    //   this.store.dispatch(new FormErrors(formError));
    // });
  }

  getBeoordelaarNaam() {
    if (!this.beoordeling) {
      return;
    }
    const beoordelaar = this.judges.find(
      (judge: IBeoordelaar) => judge.PersoonID === this.beoordeling.PersoonID,
    );
    if (beoordelaar) {
      this.beoordelaarNaam = beoordelaar.BeoordelaarNaam;
    }
  }
}

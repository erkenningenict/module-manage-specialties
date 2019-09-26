import {
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Directive,
  OnChanges,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { debounceTime } from 'rxjs/operators/debounceTime';
import {
  UpdateFormStatus,
  UpdateFormValue,
  UpdateFormDirty,
  UpdateFormErrors,
  UpdateForm,
} from '../../app-module/store/actions/form.actions';

const getValue = (obj, prop) =>
  prop.split('.').reduce((acc, part) => acc && acc[part], obj);

@Directive({
  selector: '[beNgrxForm]',
})
export class BeNgrxFormDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-input-rename
  @Input('beNgrxForm') path: string;
  // tslint:disable-next-line: no-input-rename
  @Input('beNgrxFormDebounce') debounce = 150;
  // tslint:disable-next-line: no-input-rename
  @Input('ngrxFormClearOnDestroy') clearDestroy = false;

  private _destroy$ = new Subject<null>();
  private _updating = false;

  constructor(
    private _store: Store<any>,
    private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this._store
      .select((state) => getValue(state, `${this.path}.value`))
      .pipe(takeUntil(this._destroy$))
      .subscribe((model) => {
        // if (
        //   this.path ===
        //   'manageSpecialty.specialty.model.teelttechnischeMaatregelen'
        // ) {
        //   console.log('!DH! ', this._updating, model);
        // }
        // if (!this._updating) {
        this._updating = false;
        // if (model !== undefined) {
        // console.log('!DH! path', this.path);
        if (model === '' || model !== '') {
          const formKeys = Object.keys(this._formGroupDirective.form.controls);
          this._formGroupDirective.form.controls[formKeys[0]].patchValue(model);
          this._cd.markForCheck();
        }
        // }
        // }
      });

    this._store
      .select((state) => getValue(state, `${this.path}.dirty`))
      .pipe(takeUntil(this._destroy$))
      .subscribe((dirty) => {
        if (this._formGroupDirective.form.dirty !== dirty) {
          if (dirty === true) {
            this._formGroupDirective.form.markAsDirty();
            this._cd.markForCheck();
          } else if (dirty === false) {
            this._formGroupDirective.form.markAsPristine();
            this._cd.markForCheck();
          }
        }
      });

    this._store
      .select((state) => getValue(state, `${this.path}.disabled`))
      .pipe(takeUntil(this._destroy$))
      .subscribe((disabled) => {
        // if (
        //   this.path ===
        //   'manageSpecialty.specialty.model.teelttechnischeMaatregelen'
        // ) {
        //   console.log('!DH! disabled', disabled, this.path);
        // }
        if (this._formGroupDirective.form.disabled !== disabled) {
          if (disabled === true) {
            this._formGroupDirective.form.disable();
            this._cd.markForCheck();
          } else if (disabled === false) {
            this._formGroupDirective.form.enable();
            this._cd.markForCheck();
          }
        }
      });

    this._formGroupDirective.valueChanges
      .pipe(debounceTime(this.debounce), takeUntil(this._destroy$))
      .subscribe((value) => {
        this._updating = true;
        // if (
        //   this.path ===
        //   'manageSpecialty.specialty.model.teelttechnischeMaatregelen'
        // ) {
        //   console.log('!DH! valueChanges', value, this.path);
        // }
        this._store.dispatch(
          new UpdateFormValue({
            path: this.path,
            value,
          }),
        );

        this._store.dispatch(
          new UpdateFormDirty({
            path: this.path,
            dirty: this._formGroupDirective.dirty,
          }),
        );

        const formKeys = Object.keys(this._formGroupDirective.form.controls);
        const errors = this._formGroupDirective.form.controls[formKeys[0]]
          .errors;
        this._store.dispatch(
          new UpdateFormErrors({
            path: this.path,
            errors,
          }),
        );
      });

    this._formGroupDirective.statusChanges
      .pipe(debounceTime(this.debounce), takeUntil(this._destroy$))
      .subscribe((status) => {
        // if (
        //   this.path ===
        //   'manageSpecialty.specialty.model.teelttechnischeMaatregelen'
        // ) {
        //   console.log('!DH! statusChanges', status, this.path);
        // }
        this._store.dispatch(
          new UpdateFormStatus({
            path: this.path,
            status,
          }),
        );
      });
  }

  ngOnDestroy() {
    // console.log('!DH! destroy directive');
    // if (this.clearDestroy) {
    this._destroy$.next();
    this._destroy$.complete();
    this._store.dispatch(
      new UpdateForm({
        path: this.path,
        value: null,
        dirty: null,
        status: null,
        errors: null,
      }),
    );
    // }
  }
}

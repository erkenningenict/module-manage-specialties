import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IGekozenVaardigheid } from '../../models/manage-specialty';
import { IVaardigheid } from '../../models/skills';
import { trueValidator } from '../../../shared/validators/trueValidator';

@Component({
  selector: 'be-skill-set',
  templateUrl: './skill-set.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillSetComponent implements OnInit, OnChanges {
  @Input() enableEditing: boolean;
  @Input() skills: IVaardigheid[];
  @Input() gekozenVaardigheden: IGekozenVaardigheid[];
  @Input() themaId: number;
  @Output()
  vaardigheidChecked: EventEmitter<{
    vaardigheid: IVaardigheid;
    checked: boolean;
    valid: boolean;
  }> = new EventEmitter<{
    vaardigheid: IVaardigheid;
    checked: boolean;
    valid: boolean;
  }>();
  totaalGeselecteerdePunten = 0;
  aantalBenodigdePunten = 0;
  showVaardigheden = true;
  form: FormGroup = new FormGroup({});
  showFilter = false;
  showAll: boolean;
  checkedVaardigheden: number[];
  editableSkills: IVaardigheid[] = [];
  cols = [
    { field: 'Checkbox' },
    { field: 'Code' },
    { field: 'Omschrijving' },
    { field: 'Punten' },
  ];

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.checkedVaardigheden =
      this.gekozenVaardigheden &&
      this.gekozenVaardigheden.length > 0 &&
      this.gekozenVaardigheden.map((v: IGekozenVaardigheid) => v.VaardigheidID);

    if (this.skills && this.skills.length > 0) {
      this.aantalBenodigdePunten = this.skills[0].MinimumPunten;
      this.totaalGeselecteerdePunten =
        this.gekozenVaardigheden &&
        this.skills
          .filter((skill) =>
            this.gekozenVaardigheden.find(
              (v) => skill.VaardigheidID === v.VaardigheidID,
            ),
          )
          .map((v) => v.Punten)
          .reduce((total, point) => total + point, 0);
    } else {
      this.aantalBenodigdePunten = 0;
    }

    if (this.form.controls.gekozenVaardigheden) {
      this.form.controls.gekozenVaardigheden.setValue(
        this.aantalBenodigdePunten > 0 &&
          this.totaalGeselecteerdePunten >= this.aantalBenodigdePunten,
      );
    }
    if (
      this.skills &&
      this.skills.length > 0 &&
      this.gekozenVaardigheden &&
      this.gekozenVaardigheden.length > 0 &&
      this.totaalGeselecteerdePunten >= this.aantalBenodigdePunten
    ) {
      // Toon alleen gekozen vaardigheden
      this.editableSkills = this.skills.filter(
        (v: IVaardigheid) =>
          this.checkedVaardigheden.indexOf(v.VaardigheidID) >= 0,
      );
      this.showAll = true;
    } else {
      this.editableSkills = this.skills;
      this.showAll = false;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      gekozenVaardigheden: new FormControl(false, [trueValidator]),
    });
  }

  isSelected(vaardigheid: IVaardigheid): boolean {
    return (
      this.checkedVaardigheden &&
      this.checkedVaardigheden.indexOf(vaardigheid.VaardigheidID) >= 0
    );
  }

  vaardigheidSelected($event: any, vaardigheid: IVaardigheid) {
    const checked = $event.target.checked;
    const valid =
      this.aantalBenodigdePunten > 0 &&
      this.totaalGeselecteerdePunten + (checked ? 10 : -10) >=
        this.aantalBenodigdePunten;
    this.vaardigheidChecked.emit({
      vaardigheid,
      checked,
      valid,
    });
  }

  toggleSkills() {
    if (this.showAll) {
      this.editableSkills = this.skills;
    } else {
      this.editableSkills = this.skills.filter(
        (v: IVaardigheid) =>
          this.checkedVaardigheden.indexOf(v.VaardigheidID) >= 0,
      );
    }
    this.showAll = !this.showAll;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IBijlagenData,
  IBijlagenDataExtend,
} from '../../models/manage-specialty';

@Component({
  selector: 'be-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() attachments: IBijlagenData[];
  @Input() enableEditing: boolean;
  @Input() tabIndex: number;
  @Input() currentTabIndex: number;
  @Output()
  updatedAttachments: EventEmitter<IBijlagenData[]> = new EventEmitter<
    IBijlagenData[]
  >();
  @Output()
  uploadFile: EventEmitter<{
    file: any;
    omschrijving: string;
  }> = new EventEmitter<{ file: any; omschrijving: string }>();
  @ViewChild('uploader') uploader;

  bijlagen: IBijlagenDataExtend[];
  bijlageOmschrijving: FormGroup = new FormGroup({
    omschrijving: new FormControl(['', Validators.required]),
  });
  formUpload: FormGroup = new FormGroup({
    omschrijving: new FormControl(['', Validators.required]),
  });
  documentUploaded = false;
  file: any;
  showUploadButton: boolean;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder) {}

  downloadUrl(location: string): string {
    return `/DesktopModules/AOCRaad.Erkenningen.VakkenBeheer/DownloadFile.ashx?file=${location}`;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (this.attachments) {
      this.bijlagen = this.attachments
        .filter((b: IBijlagenData) => b.Status !== 3) // Hide deleted docs
        .map((bijlage: IBijlagenData) => {
          return {
            ...bijlage,
            visible: false,
            originalText: bijlage.Omschrijving,
          } as IBijlagenDataExtend;
        });
    }
    this.formUpload = this.formBuilder.group({
      omschrijving: ['', Validators.required],
    });
  }

  ngOnInit() {}

  trackByFunction(index) {
    return index;
  }

  wijzigBijlage(bijlage: IBijlagenDataExtend) {
    this.bijlageOmschrijving = this.formBuilder.group({
      omschrijving: [bijlage.Omschrijving, Validators.required],
    });
    bijlage.visible = !bijlage.visible;
  }

  updateBijlage(bijlage: IBijlagenDataExtend, index: number, action: 2 | 3) {
    if (action === 2) {
      this.bijlagen[
        index
      ].Omschrijving = this.bijlageOmschrijving.value.omschrijving;
    }
    this.bijlagen[index].Status = action;
    const newAttachments: IBijlagenData[] = this.bijlagen.map(
      (b: IBijlagenDataExtend) => {
        return {
          DocumentID: b.DocumentID,
          Naam: b.Naam,
          Lokatie: b.Lokatie,
          Omschrijving: b.Omschrijving,
          Status: b.Status,
        } as IBijlagenData;
      },
    );
    bijlage.visible = !bijlage.visible;
    this.updatedAttachments.emit(newAttachments);
  }

  maakWijzigingOngedaan(bijlage: IBijlagenDataExtend) {
    bijlage.Omschrijving = bijlage.originalText;
    bijlage.visible = !bijlage.visible;
  }

  upload($event) {
    this.fileUploaded = true;
    const file = $event.files[0];
    this.file = file;
    this.formUpload.controls.omschrijving.setValue(
      file.name.substring(0, file.name.lastIndexOf('.')),
    );
    this.showUploadButton = true;
  }

  uploadFiles() {
    const omschrijving = this.formUpload.value.omschrijving;
    this.uploadFile.emit({
      omschrijving,
      file: this.file,
    });
    this.file = undefined;
    this.fileUploaded = false;
    this.formUpload.controls.omschrijving.reset();
    this.uploader.clear();
  }
}

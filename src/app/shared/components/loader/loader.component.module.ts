import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  providers: [LoaderComponent],
})
export class LoaderComponentModule {}

import { TestBed, inject, async } from '@angular/core/testing';

import { SpecialtyService } from './specialty.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrentDataService } from './current-data.service';
import { ParserService } from './parser.service';

describe('SpecialtyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SpecialtyService, ParserService, CurrentDataService],
    });
  });

  it(
    'should be created',
    async(
      inject(
        [SpecialtyService, HttpClient, HttpTestingController],
        (
          service: SpecialtyService,
          http: HttpClient,
          backend: HttpTestingController,
        ) => {
          expect(service).toBeTruthy();
        },
      ),
    ),
  );
});

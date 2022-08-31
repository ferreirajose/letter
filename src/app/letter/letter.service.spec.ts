
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LetterService } from './letter.service';


describe('Service: Letter', () => {
  let service: LetterService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LetterService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(LetterService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

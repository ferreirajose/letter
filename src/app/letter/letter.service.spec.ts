
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { EMPTY, of, Observable } from 'rxjs';

import { LetterService } from './letter.service';

import { User } from './../interface/user';
import { MOCK_USERS } from './../mock/users';

import { MOCK_POST } from './../mock/posts';
import { HttpClient } from '@angular/common/http';

describe('Service: Letter', () => {
  let service: LetterService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;


  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        LetterService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        }
      ],
      imports: [HttpClientTestingModule]

    });

    service = TestBed.inject(LetterService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return of all usres', (done: DoneFn) => {
  httpClientSpy.get.and.returnValue(of(MOCK_USERS));

  /** is not assignable to parameter of type 'Expected<ArrayLike<User>> | ArrayContaining<User>'
    */
  service.getUsers().subscribe((users: any) => {
    expect(users).toEqual(MOCK_USERS);
    expect(users.length).toBe(1); // espero que o tamanho do USER[] seja igual a pois MOCK_USERS tem apenas 1 objeto = [{}]

    done();
  }, (erro: any) => {
    done.fail;
  })

  expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
})


  it('should return expected posts when getposts is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_POST));
    service.getPosts().subscribe({
      next: (posts: any) => {
        expect(posts).toEqual(MOCK_POST);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});

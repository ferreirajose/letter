import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, forkJoin, map, merge, Observable, Subject, switchMap } from 'rxjs';

import { Post } from '../interface/post';
import { Address, User } from './../interface/user';
import { LetterService } from './letter.service';
import { Post } from './../interface/post';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  users$ = this.letterService.getUsers().pipe(
    catchError((err: any) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  postsByUser$ = this.users$.pipe(
    switchMap((users: Observable<User[]>) => {
     return forkJoin(
        users.map((user: User) => {
          return this.letterService.getPostsById(user.id).pipe(
            catchError((err: any) => {
              this.errorMessageSubject.next(err);
              return EMPTY;
            }))
        })
      )
    })
  )

  letter$ = combineLatest([this.users$, this.postsByUser$]).pipe(
    map(([users, posts]: [User[], Post[]]) => {
      return users.map((user: User) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: this.address(user.address),
        phone: user.phone,
        website: user.website,
        company: user.company.name,
        posts: posts.filter((post: Post) =>  user.id === post.userId)
      }))
    }
  )).pipe(

  )

  private readonly subscriptions = merge(
    this.letter$
  ).subscribe((val: any) => console.log(val));


  constructor(private letterService: LetterService) { }

  ngOnInit(): void {
  }

  private address(address: Address): string {
    return `${address.street} ${address.suite} ${address.zipcode} ${address.city}`;
  }




}

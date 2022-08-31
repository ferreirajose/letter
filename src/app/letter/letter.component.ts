import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, map, merge, Observable, switchMap, tap } from 'rxjs';
import { LetterService } from './letter.service';
import { Post } from './../interface/post';
import { HttpClient } from '@angular/common/http';
import { Address, User } from './../interface/user';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  users$ = this.letterService.getUsers();

  postsByUser$ = this.users$.pipe(
    switchMap((users: any) => {
     return forkJoin(
        users.map((user: any) => {
          return this.letterService.getPostsById(user.id)
        })
      )
    })
  )

  letter$ = combineLatest([this.users$, this.postsByUser$]).pipe(
    map(([users, posts]) => {
      return users.map((user: User) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: this.address(user.address),
        phone: user.phone,
        website: user.website,
        company: user.company.name,
        posts: posts
      }))
    }
  ))

  private readonly subscriptions = merge(
    this.letter$
  ).subscribe((val) => console.log(val));


  constructor(private letterService: LetterService) { }

  ngOnInit(): void {
  }

  private address(address: Address): string {
    return `${address.street} ${address.suite} ${address.zipcode} ${address.city}`;
  }




}

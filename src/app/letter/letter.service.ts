import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { Post } from '../interface/post';
import { User } from './../interface/user';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(retry(1), catchError(this.handleError));
  }

  getPosts(): Observable<Post[]>  {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`).pipe(retry(1), catchError(this.handleError));
  }

  getPostsById(userId: number): Observable<Post> {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${userId}`).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: <p>${error.error.message} </p>`;
    } else {
      errorMessage = `<p>Error Code: ${error.status}</p> <p>Message: ${error.message}: </p>`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }


}

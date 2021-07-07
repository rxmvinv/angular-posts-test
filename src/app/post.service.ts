import { Injectable } from '@angular/core';
import { Post } from './post';
//import { POSTS } from './mock-posts';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPosts(): Observable<Post[]> {
    // TODO: send the message _after_ fetching the posts
    this.messageService.add('PostService: fetched posts');
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(posts => this.log('fetched posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  updatePost (post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, httpOptions).pipe(
      tap(_ => this.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  addPost (post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions).pipe(
      tap((post: Post) => this.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  deletePost (post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      // if not search term, return empty post array.
      return of([]);
    }
    return this.http.get<Post[]>(`${this.postsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found posts matching "${term}"`)),
      catchError(this.handleError<Post[]>('searchPosts', []))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PostService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }

  private postsUrl = 'api/posts';  // URL to web api
}

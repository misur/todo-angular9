import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserData} from '../to-do.component';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

// const httpOptions = {
// headers: new HttpHeaders({
//   'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//   'x-rapidapi-key': '46e66258c7mshb6eb1ccd7969a2dp1fd9bfjsn71e6df9f2b1c'
// })
const headers = new HttpHeaders()
  .set('content-type', 'application/json').set('synergy-login-token', '12b89c6e-f557-4778-91ba-35ff8a2b9cb1').set('x-rapidapi-key', '46e66258c7mshb6eb1ccd7969a2dp1fd9bfjsn71e6df9f2b1c');

@Injectable()
export class ToDoService {
  users = [];

  protected _COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
  protected _NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
  ];


  constructor(private http: HttpClient) {
    this.users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
  }


  get COLORS(): string[] {
    return this._COLORS;
  }

  set COLORS(value: string[]) {
    this._COLORS = value;
  }

  get NAMES(): string[] {
    return this._NAMES;
  }

  set NAMES(value: string[]) {
    this._NAMES = value;
  }

  getList() {
    // Create 100 users
    return this.users;
  }

  getNumberOfCompletedTasks() {
    return this.users.filter(value => value.progress > 80).length;
  }


  createNewUser(id: number): UserData {
    const name = this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))] + ' ' +
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      name,
      progress: Math.round(Math.random() * 100).toString(),
      color: this.COLORS[Math.round(Math.random() * (this.COLORS.length - 1))],
      description: 'test',
      complete: false
    };
  }


  httpService(): Observable<any> {
    console.log('call request');
    return this.http.get('http://localhost:8081/rest/financial/tax/vat/setup/company/500000000', {'headers': headers})
      .pipe(
        tap(
          data => data,
          catchError(this.handleError))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}



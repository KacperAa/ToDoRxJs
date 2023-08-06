import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Mode } from '../models/mode.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationModeService {
  private _url = 'https://todo-18d0c-default-rtdb.firebaseio.com/mode.json';

  constructor(private http: HttpClient) {}

  public getMode(): Observable<boolean> {
    return this.http.get<Mode>(this._url).pipe(
      map((mode: Mode) => {
        return mode.lightmode;
      })
    );
  }

  public patchMode(value: boolean): Observable<Mode> {
    return this.http.patch<Mode>(this._url, { lightmode: value });
  }
}

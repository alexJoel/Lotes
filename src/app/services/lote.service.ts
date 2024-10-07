import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  constructor(private http: HttpClient) {}

  searchLotes(key: string): Observable<any> {
    key = key.trim();
    return this.http.get<any>(
      `https://api.apify.com/v2/datasets/${key}/items?clean=true&format=json`
    );
  }
}

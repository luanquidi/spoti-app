import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private urlSpotify: string = environment.URL_API;
  private urlSpotifyToken: string = environment.URL_SPOTIAPP;
  private token = 'BQAmPp9N6Gzx7K604f8ZSgAK8Z8OpCP2Fz6_GQe2st_czJCz9TmeW4pcgSgYOATgMS8CLY880nKqDf7ftV8';

  constructor(private http: HttpClient) {
  }

  getNewReleases(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlSpotify}browse/new-releases`, { headers }).pipe(
      map(
        (res: any) => {
          return res.albums.items;
        }
      )
    );
  }

  getArtist(q: string, type: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlSpotify}search?q=${q}&type=${type}`, { headers }).pipe(
      map(
        (res: any) => {
          return res.artists.items;
        }
      )
    );
  }

  getAnArtist(id: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlSpotify}artists/${id}`, { headers });
  }

  getTopTracks(id: string, country: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlSpotify}artists/${id}/top-tracks?country=${country}`, { headers }).pipe(
      map((res: any) => {
        return res.tracks;
      })
    );
  }

  getToken(): any {
    const data: any = {
      grant_type: 'client_credentials',
      client_id: environment.CLIENT_ID,
      client_secret: environment.CLIENT_SECRET
    };

    this.http.post(`${this.urlSpotifyToken}/token`, data).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }
}

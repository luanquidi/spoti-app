import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
  }

  search(termino: string): void {
    if (termino.length === 0) {
      this.artists = [];
      return;
    }
    this.loading = true;
    this.spotify.getArtist(termino, 'artist').subscribe(
      (res: any) => {
        this.artists = res;
        this.loading = false;
      }
    );
  }

}

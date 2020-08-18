import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent implements OnInit {

  artistId: string;
  artist: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor(private router: ActivatedRoute, private spotiservice: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe(res => {
      this.artistId = res.id;
    });

    this.getAnArtist();
    this.getTopTracks();
  }

  ngOnInit(): void {
  }

  getAnArtist(): void {
    this.spotiservice.getAnArtist(this.artistId).subscribe(artist => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getTopTracks(): void {
    this.spotiservice.getTopTracks(this.artistId, 'us').subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }

}

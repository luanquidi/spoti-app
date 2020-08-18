import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newSongs: any[] = [];
  loading: boolean;
  error: boolean;
  messageError: string;

  constructor(private spotify: SpotifyService) {
    this.error = false;
    this.loading = true;

    spotify.getNewReleases().subscribe(
      (res: any) => {
        this.newSongs = res;
        this.loading = false;
      },
      (errorService: any) => {
        this.loading = false;
        this.error = true;
        this.messageError = errorService.error.error.message;
      }
    );
  }

  ngOnInit(): void {
    AOS.init();
  }

}

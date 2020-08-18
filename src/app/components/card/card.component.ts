import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() item: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getItem(): void {
    let artistId;

    if (this.item.type === 'artist'){
      artistId = this.item.id;
    } else {
      artistId = this.item.artists[0].id;
    }

    this.router.navigate(['/artist', artistId]);
  }

}

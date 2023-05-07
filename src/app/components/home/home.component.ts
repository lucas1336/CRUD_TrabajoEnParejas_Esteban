import { Component } from '@angular/core';
import { HttpDataService } from 'src/app/service/offers.service';
import { Offers } from 'src/app/models/offer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  count = 0;
  offers: Offers[] = [];

  constructor(private httpDataService: HttpDataService) {
    this.getOffers();
  }

  getOffers() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.offers = response;
      this.count = this.offers.length;
    });
  }
}

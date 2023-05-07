import { Component } from '@angular/core';
import { Offers } from 'src/app/models/offer.model';
import { HttpDataService } from '../../service/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  offer: Offers = {
    id: '',
    title: '',
    description: '',
    points: '',
    businessid: '',
  };

  constructor(
    private httpDataService: HttpDataService,
    private router: Router
  ) {}

  createOffer() {
    this.httpDataService.createItem(this.offer).subscribe((response: any) => {
      console.log(response);
    });
  }

  onSubmit() {
    //return if form is invalid
    if (
      this.offer.title == '' ||
      this.offer.description == '' ||
      this.offer.points == '' ||
      this.offer.businessid == '' ||
      this.offer.points > 100 ||
      this.offer.title.length > 60
    ) {
      if (this.offer.points > 100) {
        alert('Points must be less than 100');
      }
      if (this.offer.title.length > 60) {
        alert('Title must be less than 60 characters');
      }
      return;
    }

    this.createOffer();
    this.router.navigate(['/business/offers']);
  }

  cancel() {
    this.router.navigate(['/business/offers']);
  }
}

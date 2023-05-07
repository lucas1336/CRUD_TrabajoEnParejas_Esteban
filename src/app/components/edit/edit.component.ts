import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpDataService } from 'src/app/service/offers.service';
import { Offers } from 'src/app/models/offer.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  offerForm!: FormGroup;
  offerData!: Offers;
  //editForm!: FormGroup;
  offerId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpDataService: HttpDataService
  ) {
    this.offerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      businessid: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.params['id'];
    this.httpDataService.getItem(this.offerId).subscribe((data: Offers) => {
      this.offerData = data;
      this.offerForm = new FormGroup({
        title: new FormControl(this.offerData.title, Validators.required),
        description: new FormControl(
          this.offerData.description,
          Validators.required
        ),
        points: new FormControl(this.offerData.points, Validators.required),
        businessid: new FormControl(
          this.offerData.businessid,
          Validators.required
        ),
      });
    });
  }

  onSubmit(): void {
    if (this.offerForm.valid) {
      this.httpDataService
        .updateItem(this.offerId, this.offerForm.value)
        .subscribe(() => {
          this.router.navigate(['/business/offers']);
        });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/business/offers']);
  }
}

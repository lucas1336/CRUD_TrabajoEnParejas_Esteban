import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from '../new/new.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Offers } from 'src/app/models/offer.model';
import { HttpDataService } from 'src/app/service/offers.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  offerForm!: FormGroup;
  offerData!: Offers;
  isEditMode = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Offers>;
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'points',
    'businessid',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    private httpDataService: HttpDataService
  ) {
    this.dataSource = new MatTableDataSource();
    this.offerData = {} as Offers;
  }

  openNewComponent() {
    const dialogRef = this.dialog.open(NewComponent);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.httpDataService.getList().subscribe((data: any) => {
      this.dataSource.data = data;
    });
    this.offerForm = new FormGroup({
      title: new FormControl({ value: '', disabled: true }),
      description: new FormControl({ value: '', disabled: true }),
      points: new FormControl({ value: '', disabled: true }),
      businessid: new FormControl({ value: '', disabled: true }),
    });
  }

  edit(element: any) {
    this.offerData = _.cloneDeep(element);
    this.isEditMode = true;
    this.offerForm.setValue({
      title: this.offerData.title,
      description: this.offerData.description,
      points: this.offerData.points,
      businessid: this.offerData.businessid,
    });
    this.enableForm();
  }

  enableForm() {
    this.offerForm.controls['title'].enable();
    this.offerForm.controls['description'].enable();
    this.offerForm.controls['points'].enable();
    this.offerForm.controls['businessid'].enable();
  }

  disableForm() {
    this.offerForm.controls['title'].disable();
    this.offerForm.controls['description'].disable();
    this.offerForm.controls['points'].disable();
    this.offerForm.controls['businessid'].disable();
  }

  delete(id: string) {
    this.httpDataService.deleteItem(id).subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = this.dataSource.data.filter(
        (d: any) => d._id !== id
      );
    });
  }

  updateMovie() {
    this.httpDataService
      .updateItem(this.offerData.id, this.offerForm.value)
      .subscribe((data: any) => {
        this.isEditMode = false;
        this.dataSource.data = this.dataSource.data.map((o: Offers) => {
          if (o.id === data.id) {
            o = data;
          }
          return o;
        });
      });
  }

  onSubmit() {
    if (this.offerForm.valid && this.isEditMode) {
      this.updateMovie();
      this.cancelEdit();
      console.log('form updated and reseted');
    } else {
      console.log('is not valid');
    }
  }

  cancelEdit() {
    this.offerForm.reset();
    this.isEditMode = false;
    this.offerData = {} as Offers;
    Object.keys(this.offerForm.controls).forEach((key) => {
      this.offerForm.controls[key].setErrors(null);
    });
    this.disableForm();
  }
}

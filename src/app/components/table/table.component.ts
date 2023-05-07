import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from '../new/new.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(public dialog: MatDialog) {}

  openNewComponent() {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '50%',
      height: 'auto',
      position: { top: '50%', left: '50%' },
      autoFocus: false,
    });
  }
}

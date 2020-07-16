import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig, MatDialogConfig } from '@angular/material';
import { StockStatusComponent } from '../stock-status.component';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StockStatusComponent>,
  ) {

    this.item = data.itemDetails;
    //console.log(this.technicians )
  }

  ngOnInit() {
  }


}

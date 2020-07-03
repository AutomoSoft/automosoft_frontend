import { Component, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { contactData } from '../../main/contact/contact-data.model';
import { contactService } from '../../main/contact/contact.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor(

    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }

  }

  ngOnInit() {

  }


}


import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { wa_block } from 'src/app/material/settingsData';

@Component({
  selector: 'app-wa-block-delete',
  templateUrl: './wa-block-delete.component.html',
  styleUrl: './wa-block-delete.component.scss'
})
export class WaBlockDeleteComponent implements OnInit {
  deletewablock = {} as wa_block;
  isAuthenticated: boolean = false;
  submitted: boolean = false;
  isError: boolean = true;
  error_message: string = '';
  message: string = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  constructor(
    private  messagesService: MessagesService,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<WaBlockDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: wa_block
  ) {
    console.log('data:' + data);
    this.deletewablock.id =data.id,
      this.deletewablock.customer_number = data.customer_number,
      this.deletewablock.client_id = data.client_id,
      this.deletewablock.in_out = data.in_out 
  }

  doAction() {
    this.dialogRef.close({ data: this.deletewablock.id});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deleteWaBlock() {
    this.isError = false;

    this.messagesService.waBlockDeleteReport(this.deletewablock.id).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        if (response == 'OK') {
          this.isError = false;
          this.error_message = 'wa block is successfully deleted';
        } else if (response.error_code == 1100) {
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else {
          this.isError = true;
          this.error_message = 'error:wa block is not deleted';
        }
      },
      (error) => {
        this.isError = true;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('net work error:' + this.error_message);
        } else {
          this.error_message = 'error message:' + error.message;
        }
        console.log(error);
        if (error.message == 0) {
          this.error_message = 'net work error:';
          console.log('net work error:' + this.error_message);
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );
  }
  ngOnInit() {
    var token = this.tokenStorage.getToken();
    if (token === undefined || token == null || token == '') {
      console.log('delete wa block:location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(
        'wa block delete',
        'login'
      );
      console.log('dashobard:location2:' + window.location.href);
      return;
    } else {
      var user = this.tokenStorage.getUser();
      if (user.roles == 'admin') {
        this.isAuthenticated = true;
      }
    }
  }
}

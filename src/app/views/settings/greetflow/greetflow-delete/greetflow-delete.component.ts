import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { greetflow } from 'src/app/material/settingsData';

@Component({
  selector: 'app-greetflow-delete',
  templateUrl: './greetflow-delete.component.html',
  styleUrl: './greetflow-delete.component.scss'
})
export class GreetflowDeleteComponent implements OnInit {
  deletecgreetflow = {} as greetflow;
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
    public dialogRef: MatDialogRef<GreetflowDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: greetflow
  ) {
    console.log('data:' + data);
    this.deletecgreetflow.slno =data.slno,
      this.deletecgreetflow.subapp_name = data.subapp_name,
      this.deletecgreetflow.appand_text = data.appand_text,
      this.deletecgreetflow.level_name = data.level_name,
      this.deletecgreetflow.old_level = data.old_level,
      this.deletecgreetflow.next_level = data.next_level,
      this.deletecgreetflow.input = data.input
      this.deletecgreetflow.text_content = data.text_content,
      this.deletecgreetflow.type_content = data.type_content,
      this.deletecgreetflow.content_path = data.content_path,
      this.deletecgreetflow.remarks = data.remarks,
      this.deletecgreetflow.enable = data.enable

  }

  doAction() {
    this.dialogRef.close({ data: this.deletecgreetflow.slno});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deleteDoGreetFlow() {
    this.isError = false;

    this.messagesService.greetflowDeleteReport(this.deletecgreetflow.slno).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        if (response == 'OK') {
          this.isError = false;
          this.error_message = 'greetflow delete components is successfully deleted';
        } else if (response.error_code == 1100) {
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else {
          this.isError = true;
          this.error_message = 'error:greetflow delete components is not deleted';
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
      console.log('greetflow delete :location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(
        'greetflow delete',
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

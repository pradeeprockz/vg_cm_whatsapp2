import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Cms_components } from 'src/app/material/cmscomponentData';


@Component({
  selector: 'app-cms-components-delete',
  templateUrl: './cms-components-delete.component.html',
  styleUrl: './cms-components-delete.component.scss'
})
export class CmsComponentsDeleteComponent implements OnInit{
  deletecmscomponents = {} as Cms_components;
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
    public dialogRef: MatDialogRef<CmsComponentsDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Cms_components
  ) {
    console.log('data:' + data);
    this.deletecmscomponents.id =data.id,
      this.deletecmscomponents.client_number = data.client_number,
      this.deletecmscomponents.sname = data.sname,
      this.deletecmscomponents.type = data.type,
      this.deletecmscomponents.parameters = data.parameters,
      this.deletecmscomponents.sub_type = data.sub_type,
      this.deletecmscomponents.index = data.index
      
  }

  doAction() {
    this.dialogRef.close({ data: this.deletecmscomponents.id});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deletedoCmsComponents() {
    this.isError = false;

    this.messagesService.cmsDeleteComponentReport(this.deletecmscomponents.id).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        if (response == 'OK') {
          this.isError = false;
          this.error_message = 'cms delete components is successfully deleted';
        } else if (response.error_code == 1100) {
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else {
          this.isError = true;
          this.error_message = 'error:cms delete components is not deleted';
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
      console.log('cms delete components:location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(
        'cms delete components',
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

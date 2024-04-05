import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Cms_temp_wa_comp_params } from '../../../material/ ICmsTempWaCompParams';

@Component({
  selector: 'app-cms-temp-wa-comp-params-delete',
  templateUrl: './cms-temp-wa-comp-params-delete.component.html',
  styleUrl: './cms-temp-wa-comp-params-delete.component.scss'
})
export class CmsTempWaCompParamsDeleteComponent implements OnInit {
  deletecmstempwacompparams = {} as Cms_temp_wa_comp_params;
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
    public dialogRef: MatDialogRef<CmsTempWaCompParamsDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Cms_temp_wa_comp_params
  ) {
    console.log('data:' + data);
    this.deletecmstempwacompparams.id = data.id 
    this.deletecmstempwacompparams.client_number = data.client_number
    this.deletecmstempwacompparams.sname = data.sname
    this.deletecmstempwacompparams.components_id = data.components_id
    this.deletecmstempwacompparams.type = data.type
    this.deletecmstempwacompparams.param_name = data.param_name
    this.deletecmstempwacompparams.media_name = data.media_name
    this.deletecmstempwacompparams.media_uri = data.media_uri
    this.deletecmstempwacompparams.mime_type = data.mime_type
    this.deletecmstempwacompparams.msg_text = data.msg_text
    this.deletecmstempwacompparams.currency_fallback_value = data.currency_fallback_value
    this.deletecmstempwacompparams.currency_code = data.currency_code
    this.deletecmstempwacompparams.date_time = data.date_time
    this.deletecmstempwacompparams.enable = data.enable
    this.deletecmstempwacompparams.is_edit = data.is_edit
  }

  doAction() {
    this.dialogRef.close({ data: this.deletecmstempwacompparams.id});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deletedoCmsTempWaCompParams() {
    this.isError = false;

    this.messagesService.cmsTempWaCompParamsDelete(this.deletecmstempwacompparams.id).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        if (response == 'OK') {
          this.isError = false;
          this.error_message = 'delete cms temp wa comp params is successfully deleted';
        } else if (response.error_code == 1100) {
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else {
          this.isError = true;
          this.error_message = 'error:delete cms temp wa comp params';
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
      console.log('cms temp wa comp params delete :location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(
        'cms temp wa comp params delete',
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

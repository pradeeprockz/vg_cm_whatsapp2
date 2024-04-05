import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { cms_temp_wa_comp_header_params } from '../../../material/CmsTempWaCompHeaderParams';

@Component({
  selector: 'app-cms-temp-wa-comp-header-params-delete',
  templateUrl: './cms-temp-wa-comp-header-params-delete.component.html',
  styleUrl: './cms-temp-wa-comp-header-params-delete.component.scss'
})
export class CmsTempWaCompHeaderParamsDeleteComponent {
  deletecmstempwacompheaderparams = {} as cms_temp_wa_comp_header_params;
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
    public dialogRef: MatDialogRef<CmsTempWaCompHeaderParamsDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: cms_temp_wa_comp_header_params
  ) {
    console.log('data:' + data);
    this.deletecmstempwacompheaderparams.id = data.id 
    this.deletecmstempwacompheaderparams.client_number = data.client_number
    this.deletecmstempwacompheaderparams.sname = data.sname
    this.deletecmstempwacompheaderparams.components_id = data.components_id
    this.deletecmstempwacompheaderparams.type = data.type
    this.deletecmstempwacompheaderparams.param_name = data.param_name
    this.deletecmstempwacompheaderparams.media_name = data.media_name
    this.deletecmstempwacompheaderparams.media_uri = data.media_uri
    this.deletecmstempwacompheaderparams.mine_type = data.mine_type
    this.deletecmstempwacompheaderparams.msg_text = data.msg_text
    this.deletecmstempwacompheaderparams.currency_fallback_value = data.currency_fallback_value
    this.deletecmstempwacompheaderparams.current_code = data.current_code
    this.deletecmstempwacompheaderparams.date_time = data.date_time
    this.deletecmstempwacompheaderparams.enable = data.enable
    this.deletecmstempwacompheaderparams.is_edit = data.is_edit
  }

  doAction() {
    this.dialogRef.close({ data: this.deletecmstempwacompheaderparams.id});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deletedoCmsTempWaCompParams() {
    this.isError = false;

    this.messagesService.cmsTempWaCompHeaderParamsDelete(this.deletecmstempwacompheaderparams.id).subscribe(
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

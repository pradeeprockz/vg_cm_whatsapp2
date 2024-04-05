import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { cms_temp_wa_comp_header_params } from '../../../material/CmsTempWaCompHeaderParams';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cms-temp-wa-comp-header-params-update',
  templateUrl: './cms-temp-wa-comp-header-params-update.component.html',
  styleUrl: './cms-temp-wa-comp-header-params-update.component.scss'
})
export class CmsTempWaCompHeaderParamsUpdateComponent extends VGCommonModule implements OnInit {
  cmstempwacompheaderparamsIdControl = new FormControl('', Validators.required);
  message = '';
  updatecmstempwacompheaderparams = {} as cms_temp_wa_comp_header_params;
  submitted: boolean = false;
 

  constructor(
    public dialogRef: MatDialogRef<CmsTempWaCompHeaderParamsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: cms_temp_wa_comp_header_params,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.updatecmstempwacompheaderparams = this.data;
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    console.log('get Token');
    console.log('cms temp wa comp params:location:' + window.location.href);
    if (this.checkToken('cms temp wa comp params-update') == false) {
      return;
    }
  }
  updateCmsTempWaCompHeaderParams() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    this.updatecmstempwacompheaderparams.enable == 1
      ? (this.updatecmstempwacompheaderparams.enable = 1)
      : (this.updatecmstempwacompheaderparams.enable = 0);
      this.updatecmstempwacompheaderparams.is_edit == 1
      ? (this.updatecmstempwacompheaderparams.is_edit = 1)
      : (this.updatecmstempwacompheaderparams.is_edit = 0);

      var data2 =
      '{"id":'+
      this.updatecmstempwacompheaderparams.id +
      ',"client_number":"' +
      this.updatecmstempwacompheaderparams.client_number +
      '","sname":"' +
      this.updatecmstempwacompheaderparams.sname +
      '","components_id":' +
      this.updatecmstempwacompheaderparams.components_id +
      ',"type":"' +
      this.updatecmstempwacompheaderparams.type +
      '","param_name":"' +
      this.updatecmstempwacompheaderparams.param_name +
      '","media_name":"' +
      this.updatecmstempwacompheaderparams.media_name +
      '","media_uri":"' +
      this.updatecmstempwacompheaderparams.media_uri +
      '","mine_type":"' +
      this.updatecmstempwacompheaderparams.mine_type +
      '","msg_text":"' +
      this.updatecmstempwacompheaderparams.msg_text +
      '","currency_fallback_value":"' +
      this.updatecmstempwacompheaderparams.currency_fallback_value +
      '","current_code":"' +
      this.updatecmstempwacompheaderparams.current_code +
      '","date_time":"' +
      this.updatecmstempwacompheaderparams.date_time +
      '","is_edit":' +
      (this.updatecmstempwacompheaderparams.is_edit == 1 ? '1' : '0') +
      ',"enable":' +
      (this.updatecmstempwacompheaderparams.enable == 1 ? '1' : '0') +
      '}';
    console.log('update cms-temp-wa-comp-header-params:' + data2);
    this.updatecmstempwacompheaderparams.enable == 1
      ? (this.updatecmstempwacompheaderparams.enable = 1)
      : (this.updatecmstempwacompheaderparams.enable = 0);
      if (this.updatecmstempwacompheaderparams.sname == '') {
        this.isError = true;
        this.error_message = 'sname must be entered';
        return;
      }
      if (this.updatecmstempwacompheaderparams.components_id == 0) {
        this.isError = true;
        this.error_message = 'components_id must be entered';
        return;
      }
      if (this.updatecmstempwacompheaderparams.param_name == '') {
        this.isError = true;
        this.error_message = 'param_name must be entered';
        return;
      }
    console.log('json-cms temp wa comp header params update:' + data2);
    this.messagesService
      .cmsTempWaCompHeaderParamsUpdate(this.updatecmstempwacompheaderparams.id, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('cms temp wa comp header params-update');
            this.error_message = 'not authorized:session expired, please login';
            return;
          }
          if (response == 'OK') {
            this.isError = false;
            this.message = 'cms temp wa comp header params was updated!';
            this.submitted = true;
          } else {
            this.isError = true;
            this.error_message = response;
            this.submitted = true;
          }
        },
        (error) => {
          this.isError = true;
          this.error_message = 'net work error:' + error;
          console.log(error);
          if (error.status == 0) {
            this.error_message = 'net work error:';
          } else if (error.error_code == 1100) {
            this.error_message = 'net work error:';
          } else {
            this.error_message = 'net work error:' + error.message;
          }
        }
      );
  }
  putCmsTempWaCompParams(id: number): void {
    this.messagesService.read(id).subscribe(
      (cmswacomptempparams) => {
        if (cmswacomptempparams.error_code == 0) {
          console.log(this.updatecmstempwacompheaderparams);
        } else {
          console.log('errpr:' + cmswacomptempparams.error_message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

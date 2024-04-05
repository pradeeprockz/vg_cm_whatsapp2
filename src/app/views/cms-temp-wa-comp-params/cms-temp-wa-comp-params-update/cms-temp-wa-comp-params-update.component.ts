import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { Cms_temp_wa_comp_params } from '../../../material/ ICmsTempWaCompParams';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cms-temp-wa-comp-params-update',
  templateUrl: './cms-temp-wa-comp-params-update.component.html',
  styleUrl: './cms-temp-wa-comp-params-update.component.scss'
})
export class CmsTempWaCompParamsUpdateComponent extends VGCommonModule implements OnInit {
  cmstempwacompparamsIdControl = new FormControl('', Validators.required);
  message = '';
  updatecmstempwacompparams = {} as Cms_temp_wa_comp_params;
  submitted: boolean = false;
 

  constructor(
    public dialogRef: MatDialogRef<CmsTempWaCompParamsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cms_temp_wa_comp_params,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.updatecmstempwacompparams = this.data;
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
  updateCmsTempWaCompParams() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    this.updatecmstempwacompparams.enable == 1
      ? (this.updatecmstempwacompparams.enable = 1)
      : (this.updatecmstempwacompparams.enable = 0);
      this.updatecmstempwacompparams.is_edit == 1
      ? (this.updatecmstempwacompparams.is_edit = 1)
      : (this.updatecmstempwacompparams.is_edit = 0);

      var data2 =
      '{"id":'+
      this.updatecmstempwacompparams.id +
      ',"client_number":"' +
      this.updatecmstempwacompparams.client_number +
      '","sname":"' +
      this.updatecmstempwacompparams.sname +
      '","components_id":' +
      this.updatecmstempwacompparams.components_id +
      ',"type":"' +
      this.updatecmstempwacompparams.type +
      '","param_name":"' +
      this.updatecmstempwacompparams.param_name +
      '","media_name":"' +
      this.updatecmstempwacompparams.media_name +
      '","media_uri":"' +
      this.updatecmstempwacompparams.media_uri +
      '","mime_type":"' +
      this.updatecmstempwacompparams.mime_type +
      '","msg_text":"' +
      this.updatecmstempwacompparams.msg_text +
      '","currency_fallback_value":"' +
      this.updatecmstempwacompparams.currency_fallback_value +
      '","currency_code":"' +
      this.updatecmstempwacompparams.currency_code +
      '","date_time":"' +
      this.updatecmstempwacompparams.date_time +
      '","is_edit":' +
      (this.updatecmstempwacompparams.is_edit == 1 ? '1' : '0') +
      ',"enable":' +
      (this.updatecmstempwacompparams.enable == 1 ? '1' : '0') +
      '}';
    console.log('update cms-template:' + data2);
    this.updatecmstempwacompparams.enable == 1
      ? (this.updatecmstempwacompparams.enable = 1)
      : (this.updatecmstempwacompparams.enable = 0);
      if (this.updatecmstempwacompparams.sname == '') {
        this.isError = true;
        this.error_message = 'sname must be entered';
        return;
      }
      if (this.updatecmstempwacompparams.components_id == 0) {
        this.isError = true;
        this.error_message = 'components_id must be entered';
        return;
      }
      if (this.updatecmstempwacompparams.param_name == '') {
        this.isError = true;
        this.error_message = 'param_name must be entered';
        return;
      }
    console.log('json-cms temp wa comp params update:' + data2);
    this.messagesService
      .cmsTempWaCompParamsUpdate(this.updatecmstempwacompparams.id, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('cms temp wa comp params-update');
            this.error_message = 'not authorized:session expired, please login';
            return;
          }
          if (response == 'OK') {
            this.isError = false;
            this.message = 'cms temp wa comp params was updated!';
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
          console.log(this.updatecmstempwacompparams);
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

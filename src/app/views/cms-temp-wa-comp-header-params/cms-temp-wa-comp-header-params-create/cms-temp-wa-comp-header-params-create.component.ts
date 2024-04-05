import { Component,Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { cms_temp_wa_comp_header_params } from '../../../material/CmsTempWaCompHeaderParams';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CmsTempWaCompHeaderParamsDeleteComponent } from '../cms-temp-wa-comp-header-params-delete/cms-temp-wa-comp-header-params-delete.component';
import { Cms_components } from 'src/app/material/cmscomponentData';

@Component({
  selector: 'app-cms-temp-wa-comp-header-params-create',
  templateUrl: './cms-temp-wa-comp-header-params-create.component.html',
  styleUrl: './cms-temp-wa-comp-header-params-create.component.scss'
})
export class CmsTempWaCompHeaderParamsCreateComponent extends VGCommonModule  {
  createtempwacompheaderparams = {} as cms_temp_wa_comp_header_params;
  cmstempheaderTypeIdControl = new FormControl('', Validators.required);
  selectedValue: number = -1;
  submitted: boolean = false;
  //dateValue:string = '2000-01-01 00:00:00';

  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<CmsTempWaCompHeaderParamsDeleteComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data:Cms_components
  ) {
    super(tokenStorage, messagesService);
    this.createtempwacompheaderparams.id = 0
    this.createtempwacompheaderparams.client_number = data.client_number == undefined ? this.client_number : data.client_number
    this.createtempwacompheaderparams.sname = data.sname == undefined ? "" : data.sname 
    this.createtempwacompheaderparams.components_id = data.id == undefined ? 0 : data.id
    this.createtempwacompheaderparams.type = ''
    this.createtempwacompheaderparams.param_name = ""
    this.createtempwacompheaderparams.media_name = ''
    this.createtempwacompheaderparams.media_uri = ''
    this.createtempwacompheaderparams.mine_type = ''
    this.createtempwacompheaderparams.msg_text = ''
    this.createtempwacompheaderparams.currency_fallback_value = ''
    this.createtempwacompheaderparams.current_code = ''
    this.createtempwacompheaderparams.date_time = ''
    this.createtempwacompheaderparams.enable = 1;
    this.createtempwacompheaderparams.is_edit = 0

    this.createtempwacompheaderparams.date_time ='2000-01-01 00:00:00' //datePipe.transform(Date.now(), 'yyyy-mm-dd hh-mm-ss') || ''

  }

  ngOnInit(): void {
    console.log('cms temp wa comp header params:location:' + window.location.href);
    if (this.checkToken('cms temp wa comp header params-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
  }

  createCmsTempWaCompHeaderParams(): void {
    this.isError = false;
    this.error_message = '';
    var data2 =
      '{"id":0,"client_number":"' +
      this.createtempwacompheaderparams.client_number +
      '","sname":"' +
      this.createtempwacompheaderparams.sname +
      '","components_id":' +
      this.createtempwacompheaderparams.components_id +
      ',"type":"' +
      this.createtempwacompheaderparams.type +
      '","param_name":"' +
      this.createtempwacompheaderparams.param_name +
      '","media_name":"' +
      this.createtempwacompheaderparams.media_name +
      '","media_uri":"' +
      this.createtempwacompheaderparams.media_uri +
      '","mine_type":"' +
      this.createtempwacompheaderparams.mine_type +
      '","msg_text":"' +
      this.createtempwacompheaderparams.msg_text +
      '","currency_fallback_value":"' +
      this.createtempwacompheaderparams.currency_fallback_value +
      '","current_code":"' +
      this.createtempwacompheaderparams.current_code +
      '","date_time":"' +
      this.createtempwacompheaderparams.date_time +
      '","is_edit":' +
      (this.createtempwacompheaderparams.is_edit == 1 ? '1' : '0') +
      ',"enable":' +
      (this.createtempwacompheaderparams.enable == 1 ? '1' : '0') +
      '}';
    console.log('create cms temp wa compparams:' + data2);
    if (this.createtempwacompheaderparams.client_number == '') {
      this.isError = true;
      this.error_message = 'client_number must be entered';
      return;
    }
    if (this.createtempwacompheaderparams.sname == '') {
      this.isError = true;
      this.error_message = 'sname must be entered';
      return;
    }
    if (this.createtempwacompheaderparams.components_id == 0) {
      this.isError = true;
      this.error_message = 'components_id must be entered';
      return;
    }
    if (this.createtempwacompheaderparams.param_name == '') {
      this.isError = true;
      this.error_message = 'param_name must be entered';
      return;
    }

    this.messagesService.cmsTempWaCompHeaderParamsCreate(data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms temp wa comp header params report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'cms temp wa comp header params not created ' + response;
          return;
        }
        this.createtempwacompheaderparams = response;
        this.error_message = 'cms temp wa comp header params is successfully created';
      },

      (error) => {
        this.isError = true;
        this.submitted = true;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('net work error:' + this.error_message);
        } else if (error.error_code == 1100) {
          this.error_message = 'net work error:';
        } else {
          this.error_message = 'error message:' + error.message;
        }
        this.isError = true;
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

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  newCmsWaCompHeaderParams(): void {
    this.submitted = false;
    this.createtempwacompheaderparams = {
      id: 0,
      client_number: '',
      sname: '',
      components_id: 0,
      type: '',
      param_name: "",
      media_name: '',
      media_uri: '',
      mine_type: '',
      msg_text: '',
      currency_fallback_value: '',
      current_code: '',
      date_time: '',
      enable: 0,
      is_edit: 0,
    };
  }
}

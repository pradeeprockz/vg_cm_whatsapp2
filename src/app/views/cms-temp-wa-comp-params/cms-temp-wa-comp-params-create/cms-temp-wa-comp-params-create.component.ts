import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { Cms_temp_wa_comp_params } from '../../../material/ ICmsTempWaCompParams';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { CmsTempWaCompParamsDeleteComponent } from '../cms-temp-wa-comp-params-delete/cms-temp-wa-comp-params-delete.component';
import { Cms_components } from 'src/app/material/cmscomponentData';

@Component({
  selector: 'app-cms-temp-wa-comp-params-create',
  templateUrl: './cms-temp-wa-comp-params-create.component.html',
  styleUrl: './cms-temp-wa-comp-params-create.component.scss'
})
export class CmsTempWaCompParamsCreateComponent extends VGCommonModule {
  createtempwacompparams = {} as Cms_temp_wa_comp_params;
  cmstemplateTypeIdControl = new FormControl('', Validators.required);
  selectedValue: number = -1;
  submitted: boolean = false;
 

  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<CmsTempWaCompParamsDeleteComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Cms_components
  ) {
    super(tokenStorage, messagesService);
    this.createtempwacompparams.id = 0
    this.createtempwacompparams.client_number = data.client_number == undefined ? this.client_number : data.client_number;
    this.createtempwacompparams.sname = data.sname  == undefined ?  "" : data.sname 
    this.createtempwacompparams.components_id = data.id == undefined ?  0 : data.id 
    this.createtempwacompparams.type = ''
    this.createtempwacompparams.param_name = ""
    this.createtempwacompparams.media_name = ''
    this.createtempwacompparams.media_uri = ''
    this.createtempwacompparams.mime_type = ''
    this.createtempwacompparams.msg_text = ''
    this.createtempwacompparams.currency_fallback_value = ''
    this.createtempwacompparams.currency_code = ''
    this.createtempwacompparams.date_time = ''
    this.createtempwacompparams.enable = 1;
    this.createtempwacompparams.is_edit = 0

    //datePipe.transform(Date.now(), 'yyyy-mm-dd hh-mm-ss') || ''
    this.createtempwacompparams.date_time = '2000-01-01 00:00:00' 

  }

  ngOnInit(): void {
    console.log('cms temp wa compparams:location:' + window.location.href);
    if (this.checkToken('cms temp wa comp params-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
  }

  createCmsTempWaCompParams(): void {
    this.isError = false;
    this.error_message = '';
    var data2 =
      '{"id":0,"client_number":"' +
      this.createtempwacompparams.client_number +
      '","sname":"' +
      this.createtempwacompparams.sname +
      '","components_id":' +
      this.createtempwacompparams.components_id +
      ',"type":"' +
      this.createtempwacompparams.type +
      '","param_name":"' +
      this.createtempwacompparams.param_name +
      '","media_name":"' +
      this.createtempwacompparams.media_name +
      '","media_uri":"' +
      this.createtempwacompparams.media_uri +
      '","mime_type":"' +
      this.createtempwacompparams.mime_type +
      '","msg_text":"' +
      this.createtempwacompparams.msg_text +
      '","currency_fallback_value":"' +
      this.createtempwacompparams.currency_fallback_value +
      '","currency_code":"' +
      this.createtempwacompparams.currency_code +
      '","date_time":"' +
      this.createtempwacompparams.date_time +
      '","is_edit":' +
      (this.createtempwacompparams.is_edit == 1 ? '1' : '0') +
      ',"enable":' +
      (this.createtempwacompparams.enable == 1 ? '1' : '0') +
      '}';
    console.log('create cms temp wa comp params:' + data2);
    if (this.createtempwacompparams.client_number == '') {
      this.isError = true;
      this.error_message = 'client_number must be entered';
      return;
    }
    if (this.createtempwacompparams.sname == '') {
      this.isError = true;
      this.error_message = 'sname must be entered';
      return;
    }
    if (this.createtempwacompparams.components_id == 0) {
      this.isError = true;
      this.error_message = 'components_id must be entered';
      return;
    }
    if (this.createtempwacompparams.type == '') {
      this.isError = true;
      this.error_message = 'type must be entered' 
      return;
    }
    if (this.createtempwacompparams.param_name == '') {
      this.isError = true;
      this.error_message = 'param_name must be entered';
      return;
    }

    this.messagesService.cmsTempWaCompParamsCreate(data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms temp wa compparams report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'cms temp wa compparams not created ' + response;
          return;
        }
        this.createtempwacompparams = response;
        this.error_message = 'cms temp wa compparams is successfully created';
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
  newCmsWaCompParams(): void {
    this.submitted = false;
    this.createtempwacompparams = {
      id: 0,
      client_number: '',
      sname: '',
      components_id: 0,
      type: '',
      param_name: "",
      media_name: '',
      media_uri: '',
      mime_type: '',
      msg_text: '',
      currency_fallback_value: '',
      currency_code: '',
      date_time: '',
      enable: 0,
      is_edit: 0,
    };
  }
}

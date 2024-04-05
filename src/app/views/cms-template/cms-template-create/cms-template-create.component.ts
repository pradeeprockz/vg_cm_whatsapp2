import { Component } from '@angular/core';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { Cms_template, create_cms_components } from '../../../material/cmstemplatedata';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CmsTemplateDeleteComponent } from '../cms-template-delete/cms-template-delete.component';


@Component({
  selector: 'app-cms-template-create',
  templateUrl: './cms-template-create.component.html',
  styleUrl: './cms-template-create.component.scss'
})
export class CmsTemplateCreateComponent extends VGCommonModule {
  createcmstemplate = {} as Cms_template;
  createcmscomponents = {} as create_cms_components;
  cmstemplateIdControl = new FormControl('', Validators.required);
  sname: string = '';
  templatewacomponents: number = 0;
  selectedValue: number = -1;
  submitted: boolean = false;
  data2: string = '';



  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<CmsTemplateDeleteComponent>,

  ) {
    super(tokenStorage, messagesService);
    this.createcmstemplate.id = 0,
      this.createcmstemplate.client_number = this.client_number,
      this.createcmstemplate.sname = '',
      this.createcmstemplate.template_wa_Namespace = this.template_wa_namespace,
      this.createcmstemplate.template_wa_elementname = '',
      this.createcmstemplate.language_policy = "deterministic",
      this.createcmstemplate.language_code = 'en_GB',
      this.createcmstemplate.template_wa_components = 0,
      this.createcmstemplate.msg_text = '',
      this.createcmstemplate.contacts = 0,
      this.createcmstemplate.location_latitude = '',
      this.createcmstemplate.location_longitude = '',
      this.createcmstemplate.lable = '',
      this.createcmstemplate.search_query = '',
      this.createcmstemplate.media_name = '',
      this.createcmstemplate.media_uri = '',
      this.createcmstemplate.mime_type = '',
      this.createcmstemplate.enable = 1


  }

  ngOnInit(): void {
    console.log('cms-template-create:location:' + window.location.href);
    if (this.checkToken('cms-template-create-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
  }

  creategetCmsTemplate(): void {
    this.isError = false;
    this.error_message = '';
    (this.createcmstemplate.template_wa_components == 1)
      ? this.createcmstemplate.template_wa_components = 1 :
      this.createcmstemplate.template_wa_components = 0

    this.data2 =
      '{"id":0,"client_number":"' +
      this.createcmstemplate.client_number +
      '","sname":"' +
      this.createcmstemplate.sname +
      '","template_wa_Namespace":"' +
      this.createcmstemplate.template_wa_Namespace +
      '","template_wa_elementname":"' +
      this.createcmstemplate.template_wa_elementname +
      '","language_policy":"' +
      this.createcmstemplate.language_policy +
      '","language_code":"' +
      this.createcmstemplate.language_code +
      '","template_wa_components":' +
      this.createcmstemplate.template_wa_components +
      ',"msg_text":"' +
      this.createcmstemplate.msg_text +
      '","contacts":' +
      this.createcmstemplate.contacts +
      ',"location_latitude":"' +
      this.createcmstemplate.location_latitude +
      '","location_longitude":"' +
      this.createcmstemplate.location_longitude +
      '","lable":"' +
      this.createcmstemplate.lable +
      '","search_query":"' +
      this.createcmstemplate.search_query +
      '","media_name":"' +
      this.createcmstemplate.media_name +
      '","media_uri":"' +
      this.createcmstemplate.media_uri +
      '","mime_type":"' +
      this.createcmstemplate.mime_type +
      '","enable":' +
      (this.createcmstemplate.enable == 1 ? '1' : '0') +
      '}';
    console.log('create cms-template:' + this.data2);


    if (this.createcmstemplate.sname == '') {
      this.isError = true;
      this.error_message = 'sname must be entered';
      return;
    }
    if (this.createcmstemplate.template_wa_elementname == '') {
      this.isError = true;
      this.error_message = 'template_wa_elementname must be entered';
      return;
    }

    this.messagesService.getCmsTemlateCreateReport(this.data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-template-create-report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'cms-template not created ' + response;
          return;
        }
        this.createcmstemplate = response;
        this.error_message = 'cms-template-create is successfully created';
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

  createCmsComponent(): void {
    this.createcmscomponents.client_number = this.client_number;
    this.createcmscomponents.sname = this.sname;
    this.createcmscomponents.template_wa_components = this.templatewacomponents
    if (this.client_number == '') {
      this.isError = true;
      this.error_message = 'client_number must be entered';
      return;
    }

    if (this.sname == '') {
      this.isError = true;
      this.error_message = 'sname must be entered';
      return;
    }

  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  newCmsTemplate(): void {
    this.submitted = false;
    this.createcmstemplate = {
      id: 0,
      client_number: '',
      sname: '',
      template_wa_Namespace: '',
      template_wa_elementname: '',
      language_policy: '',
      language_code: '',
      template_wa_components: 0,
      msg_text: '',
      contacts: 0,
      location_latitude: '',
      location_longitude: '',
      lable: '',
      search_query: '',
      media_name: '',
      media_uri: '',
      mime_type: '',
      enable: 0
    };
  }
}

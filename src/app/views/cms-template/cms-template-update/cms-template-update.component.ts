
import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { Cms_template } from 'src/app/material/cmstemplatedata';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-cms-template-update',
  templateUrl: './cms-template-update.component.html',
  styleUrl: './cms-template-update.component.scss'
})
export class CmsTemplateUpdateComponent extends VGCommonModule implements OnInit {
  cmstemplateIdControl = new FormControl('', Validators.required);
  message = '';
  updatecmstemplate = {} as Cms_template;
  submitted: boolean = false;

 

  constructor(
    public dialogRef: MatDialogRef<CmsTemplateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cms_template,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.updatecmstemplate = this.data;
    console.log(this.data);
    this.data.client_number = '00919705520520'
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    console.log('get Token');
    console.log('cms-update-template:location:' + window.location.href);
    if (this.checkToken('cms-update-template') == false) {
      return;
    }
    //this.getCampaingSlnoName();
  }
  updatedoCmsTemplate() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    this.updatecmstemplate.enable == 1
      ? (this.updatecmstemplate.enable = 1)
      : (this.updatecmstemplate.enable = 0);
      this.updatecmstemplate.template_wa_components == 1
      ? (this.updatecmstemplate.template_wa_components = 1)
      : (this.updatecmstemplate.enable = 0);

      var data2 =
      '{"id":'+
      this.updatecmstemplate.id+
      ',"client_number":"' +
      this.updatecmstemplate.client_number +
      '","sname":"' +
      this.updatecmstemplate.sname +
      '","template_wa_Namespace":"' +
      this.updatecmstemplate.template_wa_Namespace +
      '","template_wa_elementname":"' +
      this.updatecmstemplate.template_wa_elementname +
      '","language_policy":"' +
      this.updatecmstemplate.language_policy +
      '","language_code":"' +
      this.updatecmstemplate.language_code +
      '","template_wa_components":' +
      this.updatecmstemplate.template_wa_components +
      ',"msg_text":"' +
      this.updatecmstemplate.msg_text +
      '","contacts":' +
      this.updatecmstemplate.contacts +
      ',"location_latitude":"' +
      this.updatecmstemplate.location_latitude +
      '","location_longitude":"' +
      this.updatecmstemplate.location_longitude +
      '","lable":"' +
      this.updatecmstemplate.lable +
      '","search_query":"' +
      this.updatecmstemplate.search_query +
      '","media_name":"' +
      this.updatecmstemplate.media_name +
      '","media_uri":"' +
      this.updatecmstemplate.media_uri +
      '","mime_type":"' +
      this.updatecmstemplate.mime_type +
      '","enable":' +
      (this.updatecmstemplate.enable == 1 ? '1' : '0') +
      '}';
    console.log('update cms-template:' + data2);
    this.updatecmstemplate.enable == 1
      ? (this.updatecmstemplate.enable = 1)
      : (this.updatecmstemplate.enable = 0);
      if (this.updatecmstemplate.sname == '') {
        this.isError = true;
        this.error_message = 'sname must be entered';
        return;
      }
      if (this.updatecmstemplate.template_wa_Namespace == '') {
        this.isError = true;
        this.error_message = 'template_wa_namespace must be entered';
        return;
      }
      if (this.updatecmstemplate.template_wa_elementname == '') {
        this.isError = true;
        this.error_message = 'template_wa_elementname must be entered';
        return;
      }
    console.log('json-cms-update-template :' + data2);
    this.messagesService
      .cmsUpdateTemplateReport(this.updatecmstemplate.id, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('cms-template-update');
            this.error_message = 'not authorized:session expired, please login';
            return;
          }
          if (response == 'OK') {
            this.isError = false;
            this.message = 'cms-update-did was updated!';
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
  putCmsUpdateTemplate(id: number): void {
    this.messagesService.read(id).subscribe(
      (cmstemplate) => {
        if (cmstemplate.error_code == 0) {
          console.log(this.updatecmstemplate);
        } else {
          console.log('errpr:' + cmstemplate.error_message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

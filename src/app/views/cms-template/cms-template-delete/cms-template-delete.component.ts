import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Cms_template } from 'src/app/material/cmstemplatedata';

@Component({
  selector: 'app-cms-template-delete',
  templateUrl: './cms-template-delete.component.html',
  styleUrl: './cms-template-delete.component.scss'
})
export class CmsTemplateDeleteComponent implements OnInit {

  deletecmstemplate = {} as Cms_template;
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
    public dialogRef: MatDialogRef<CmsTemplateDeleteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Cms_template
  ) {
    console.log('data:' + data);
    this.deletecmstemplate.id =data.id,
      this.deletecmstemplate.client_number = data.client_number,
      this.deletecmstemplate.sname = data.sname,
      this.deletecmstemplate.template_wa_Namespace = data.template_wa_Namespace,
      this.deletecmstemplate.template_wa_elementname = data.template_wa_elementname,
      this.deletecmstemplate.language_policy = data.language_policy,
      this.deletecmstemplate.language_code = data.language_code,
      this.deletecmstemplate.template_wa_components = data.template_wa_components,
      this.deletecmstemplate.msg_text = data.msg_text,
      this.deletecmstemplate.contacts = data.contacts,
      this.deletecmstemplate.location_latitude = data.location_latitude,
      this.deletecmstemplate.location_longitude = data.location_longitude,
      this.deletecmstemplate.lable = data.lable,
      this.deletecmstemplate.search_query = data.search_query,
      this.deletecmstemplate.media_name = data.media_name,
      this.deletecmstemplate.media_uri = data.media_uri,
      this.deletecmstemplate.mime_type = data.mime_type,
      this.deletecmstemplate.enable = data.enable
  }

  doAction() {
    this.dialogRef.close({ data: this.deletecmstemplate.id});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  deletedoCmsDeleteTemplate() {
    this.isError = false;

    this.messagesService.cmsDeleteTemplateReport(this.deletecmstemplate.id).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        if (response == 'OK') {
          this.isError = false;
          this.error_message = 'cms delete template is successfully deleted';
        } else if (response.error_code == 1100) {
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else {
          this.isError = true;
          this.error_message = 'error:cms delete template is not deleted';
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
      console.log('cms delete template:location:' + window.location.href);
      //window.location.href = 'http://localhost:4200/#/login';
      window.location.href = window.location.href.replace(
        'cms delete template',
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

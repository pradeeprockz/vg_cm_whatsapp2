import { Component,Inject } from '@angular/core';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CmsComponentsDeleteComponent } from '../cms-components-delete/cms-components-delete.component';
import { Cms_components } from 'src/app/material/cmscomponentData';
import { Cms_template } from 'src/app/material/cmstemplatedata';


@Component({
  selector: 'app-cms-components-create',
  templateUrl: './cms-components-create.component.html',
  styleUrl: './cms-components-create.component.scss'
})
export class CmsComponentsCreateComponent extends VGCommonModule {
  createcmscomponents = {} as Cms_components;
  cmstemplateTypeIdControl = new FormControl('', Validators.required);
  cmstemplate = {} as Cms_template
  selectedValue: number = -1;
  submitted: boolean = false;


  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<CmsComponentsDeleteComponent>,
    @Inject (MAT_DIALOG_DATA)public data: Cms_template
  ) {
    super(tokenStorage, messagesService);
    this.createcmscomponents.id = 0,
      this.createcmscomponents.client_number = this.client_number,
      this.createcmscomponents.sname =data.sname;
      this.createcmscomponents.type = ''
      this.createcmscomponents.parameters ="1",
      this.createcmscomponents.sub_type = "",
      this.createcmscomponents.index = 0

  }

  ngOnInit(): void {
    console.log('cms-components:location:' + window.location.href);
    if (this.checkToken('cms-components-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
  }

  creategetCmsComponents(): void {
    this.isError = false;
    this.error_message = '';
    var data2 =
      '{"id":0,"client_number":"' +
      this.createcmscomponents.client_number +
      '","sname":"' +
      this.createcmscomponents.sname +
      '","type":"' +
      this.createcmscomponents.type +
      '","parameters":"' +
      this.createcmscomponents.parameters +
      '","sub_type":"' +
      this.createcmscomponents.sub_type +
      '","index":' +
      this.createcmscomponents.index +
      '}';
    console.log('create cms-components:' + data2);

    if (this.createcmscomponents.client_number == '') {
      this.isError = true;
      this.error_message = 'client_number must be entered';
      return;
    }
    if (this.createcmscomponents.sname == '') {
      this.isError = true;
      this.error_message = 'sname must be entered';
      return;
    }
    if (this.createcmscomponents.type == '') {
      this.isError = true;
      this.error_message = 'type must be entered';
      return;
    }
    if (this.createcmscomponents.parameters == '') {
      this.isError = true;
      this.error_message = 'parameters must be entered';
      return;
    }

    this.messagesService.getCmsComponentCreateReport(data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-components-report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'cms-components not created ' + response;
          return;
        }
        this.createcmscomponents = response;
        this.error_message = 'cms-components is successfully created';
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
  newCmsComponents(): void {
    this.submitted = false;
    this.createcmscomponents = {
      id: 0,
      client_number: '',
      sname: '',
      type: '',
      parameters: '',
      sub_type: '',
      index: 0,
    };
  }
}

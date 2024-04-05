import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cms_components } from 'src/app/material/cmscomponentData';

@Component({
  selector: 'app-cms-components-update',
  templateUrl: './cms-components-update.component.html',
  styleUrl: './cms-components-update.component.scss'
})
export class CmsComponentsUpdateComponent extends VGCommonModule implements OnInit{
  cmscomponentsTypeIdControl = new FormControl('', Validators.required);
  message = '';
  updatecmscomponents = {} as Cms_components;
  submitted: boolean = false;
 

  constructor(
    public dialogRef: MatDialogRef<CmsComponentsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cms_components,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.updatecmscomponents = this.data;
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    console.log('get Token');
    console.log('cms-update-components:location:' + window.location.href);
    if (this.checkToken('cms-update-components') == false) {
      return;
    }
    //this.getCampaingSlnoName();
  }
  updatedoCmsComponents() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    var data2 =
    '{"id":'+
    this.updatecmscomponents.id +
    ',"client_number":"' +
    this.updatecmscomponents.client_number +
    '","sname":"' +
    this.updatecmscomponents.sname +
    '","type":"' +
    this.updatecmscomponents.type +
    '","parameters":"' +
    this.updatecmscomponents.parameters +
    '","sub_type":"' +
    this.updatecmscomponents.sub_type +
    '","index":' +
    this.updatecmscomponents.index +
    '}';
  console.log('update cms-components:' + data2);
  if (this.updatecmscomponents.sname == '') {
    this.isError = true;
    this.error_message = 'sname must be entered';
    return;
  }
  if (this.updatecmscomponents.type == '') {
    this.isError = true;
    this.error_message = 'type must be entered';
    return;
  }
  if (this.updatecmscomponents.parameters == '') {
    this.isError = true;
    this.error_message = 'parameters must be entered';
    return;
  }
    console.log('json-cms-update-components :' + data2);
    this.messagesService
      .cmsUpdateComponentReport(this.updatecmscomponents.id, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('cms-components-update');
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
  putCmsUpdateComponents(id: number): void {
    this.messagesService.read(id).subscribe(
      (cmstemplate) => {
        if (cmstemplate.error_code == 0) {
          console.log(this.updatecmscomponents);
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

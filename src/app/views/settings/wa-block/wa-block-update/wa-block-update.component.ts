import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { wa_block } from 'src/app/material/settingsData';

@Component({
  selector: 'app-wa-block-update',
  templateUrl: './wa-block-update.component.html',
  styleUrl: './wa-block-update.component.scss'
})
export class WaBlockUpdateComponent extends VGCommonModule implements OnInit{
  cmstempwacompparamsIdControl = new FormControl('', Validators.required);
  message = '';
  updatewablock = {} as wa_block;
  submitted: boolean = false;
 

  constructor(
    public dialogRef: MatDialogRef<wa_block>,
    @Inject(MAT_DIALOG_DATA) public data: wa_block,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.updatewablock = this.data;
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    console.log('get Token');
    console.log('wa block:location:' + window.location.href);
    if (this.checkToken('wa block-update') == false) {
      return;
    }
  }
  updateWaBlock() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    this.updatewablock.enable == 1
      ? (this.updatewablock.enable = 1)
      : (this.updatewablock.enable = 0);
      

      var data2 =
      '{"id":'+
      this.updatewablock.id +
      ',"customer_number":' +
      this.updatewablock.customer_number +
      ',"client_id":' +
      this.updatewablock.client_id +
      ',"in_out":' +
      this.updatewablock.in_out +
      ',"instime":"' +
      this.updatewablock.instime +
      '","enable":' +
      (this.updatewablock.enable == 1 ? '1' : '0') +
      '}';
    console.log('update wa_block:' + data2);
    
      if (this.updatewablock.customer_number == 0) {
        this.isError = true;
        this.error_message = 'customer_number must be entered';
        return;
      }

    console.log('json-wa block update:' + data2);
    this.messagesService
      .waBlockUpdateReport(this.updatewablock.id, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('wa block-update');
            this.error_message = 'not authorized:session expired, please login';
            return;
          }
          if (response == 'OK') {
            this.isError = false;
            this.message = 'wa block was updated!';
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
 /* putCmsTempWaCompParams(id: number): void {
    this.messagesService.read(id).subscribe(
      (cmswacomptempparams) => {
        if (cmswacomptempparams.error_code == 0) {
          console.log(this.updatewablock);
        } else {
          console.log('errpr:' + cmswacomptempparams.error_message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }*/
}

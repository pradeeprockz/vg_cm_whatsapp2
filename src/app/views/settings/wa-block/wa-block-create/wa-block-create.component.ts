import { Component, Inject } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { wa_block } from '../../../../material/settingsData';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { WaBlockDeleteComponent } from '../wa-block-delete/wa-block-delete.component';

@Component({
  selector: 'app-wa-block-create',
  templateUrl: './wa-block-create.component.html',
  styleUrl: './wa-block-create.component.scss'
})
export class WaBlockCreateComponent extends VGCommonModule {
  createtewablock = {} as wa_block;
  cmstemplateTypeIdControl = new FormControl('', Validators.required);
  selectedValue: number = -1;
  submitted: boolean = false;
 // date:string = '';
  currentDate = new Date();

 currentDayOfMonth = this.currentDate.getDate();
 currentMonth = this.currentDate.getMonth(); // Be careful! January is 0, not 1
 currentYear = this.currentDate.getFullYear();
 dateString = this.currentYear + "-" + (this.currentMonth + 1) + "-" + this.currentDayOfMonth; // "2023-11-27"
 

  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<WaBlockDeleteComponent>,
    //private datePipe: DatePipe,
   // @Inject(MAT_DIALOG_DATA) public data: wa_block
  ) {
    super(tokenStorage, messagesService);
    this.createtewablock.id = 0
    this.createtewablock.customer_number =0
    this.createtewablock.client_id = 0
    this.createtewablock.in_out = 2
    this.createtewablock.enable = 1;
    this.createtewablock.instime = ''
    console.log("date : "+this.dateString+" "+this.currentDate.toLocaleTimeString())
    
  }

  ngOnInit(): void {
    console.log('wa block :location:' + window.location.href);
    if (this.checkToken('wa block-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
  }

  createWaBlock(): void {
    this.isError = false;
    this.error_message = '';
    var data2 =
      '{"id":0,"customer_number":' +
      this.createtewablock.customer_number +
      ',"client_id":' +
      this.createtewablock.client_id +
      ',"in_out":' +
      this.createtewablock.in_out +
      ',"instime":"' +
      this.createtewablock.instime +
      '","enable":' +
      (this.createtewablock.enable == 1 ? '1' : '0') +
      '}';
    console.log('create wa block :' + data2);
    if (this.createtewablock.customer_number == 0) {
      this.isError = true;
      this.error_message = 'customer_number must be entered';
      return;
    }
    if (this.createtewablock.in_out = 0) {
      this.isError = true;
      this.error_message = 'in_out must be entered';
      return;
    }
    this.messagesService.getWaBlockCreateReport(data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('wa block create report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'wa block create report not created ' + response;
          return;
        }
        this.createtewablock = response;
        this.error_message = 'wa block report is successfully created';
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
  newWaBlock(): void {
    this.submitted = false;
    this.createtewablock = {
      id: 0,
      customer_number: 0,
      in_out: 0,
      client_id: 0,
      instime: '',
      enable: 0,
      
    };
  }
}

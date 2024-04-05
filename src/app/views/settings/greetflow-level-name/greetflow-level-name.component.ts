import { Component,Inject, OnInit } from '@angular/core';
import { VGCommonModule } from 'src/app/views/CommonModule';
import { greetflow } from '../../../material/settingsData';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GreetflowDeleteComponent } from '../greetflow/greetflow-delete/greetflow-delete.component';



@Component({
  selector: 'app-greetflow-level-name',
  templateUrl: './greetflow-level-name.component.html',
  styleUrl: './greetflow-level-name.component.scss'
})
export class GreetflowLevelNameComponent extends VGCommonModule implements OnInit {
  creategreetflow = {} as greetflow;
  cmstemplateTypeIdControl = new FormControl('', Validators.required);
  selectedValue: number = -1;
  submitted: boolean = false;
  currentDate = new Date();
  levelNames = new Set<string>();
  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<GreetflowDeleteComponent>,
   @Inject(MAT_DIALOG_DATA) public data: greetflow
  ) {
    super(tokenStorage, messagesService);
    this.creategreetflow.slno = 0
    this.creategreetflow.subapp_name = data.subapp_name
    this.creategreetflow.level_name = ''
    this.creategreetflow.old_level = ''
    this.creategreetflow.next_level = ''
    this.creategreetflow.input = ''   
    this.creategreetflow.appand_text = ''
    this.creategreetflow.type_content = 0
    this.creategreetflow.text_content = ''
    this.creategreetflow.content_path = ''
    this.creategreetflow.remarks = ''
    this.creategreetflow.enable = 1

  }

  ngOnInit(): void {
    console.log('greetflow :location:' + window.location.href);
    if (this.checkToken('greetflow-report') == false) {
      this.error_message = 'not authorized:session expired, please login';
      return;
    }
    this.getLevelNames();
  }

  createGreetFlowLevelName(): void {
    this.isError = false;
    this.error_message = '';
    var data2 =
      '{"slno":0, "subapp_name":"' +
      this.creategreetflow.subapp_name +
      '","level_name":"' +
      this.creategreetflow.level_name +
      '","old_level":"' +
      this.creategreetflow.old_level +
      '","next_level":"' +
      this.creategreetflow.next_level +
      '","input":"' +
      this.creategreetflow.input +
      '","appand_text":"' +
      this.creategreetflow.appand_text +
      '","type_content":' +
      this.creategreetflow.type_content +
      ',"text_content":"' +
      this.creategreetflow.text_content +
      '","content_path":"' +
      this.creategreetflow.content_path +
      '","remarks":"' +
      this.creategreetflow.remarks +
      '","enable":' +
      (this.creategreetflow.enable == 1 ? '1' : '0') +
      '}';
    console.log('create greetflow-level-name :' + data2);
    if (this.creategreetflow.level_name == '') {
      this.isError = true;
      this.error_message = 'level_name must be entered';
      return;
    }
    this.messagesService.getGreetflowCreateReport(data2).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('create greetflow-level-name report');
          return;
        }
        if (response.toString().indexOf('Error') != -1) {
          this.isError = true;
          this.error_message = 'create greetflow-level-name not created ' + response;
          return;
        }
        this.creategreetflow = response;
        this.error_message = 'greetflow report is successfully created';
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
  getLevelNames() {
    console.log(this.creategreetflow.subapp_name);
    this.messagesService.getLevelNames(this.creategreetflow.subapp_name).subscribe(
      (response) => {
        console.log(response);
        if(response=="{}"){
          this.error_message = 'no data';
          this.isError=true
          return;
        }
        if (response.error_code == 1100) {
          this.redirectLogin('create greetflow-level-name-report');
          this.error_message = 'not authorized:no session,please login';
          this.isError=true
          return;
        }
        this.levelNames.add("");
        response.forEach((item: any) => {
          this.levelNames.add(item.LevelName);
        })
        this.isError = false;
      },
      (error) => {
        this.isError = false;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('net work error:' + this.error_message);
        } else {
          this.error_message = ' error message:' + error.message;
        }
        this.isError = true;
        console.log(error);
        if (error.message == 0) {
          this.error_message = 'net work error:';
          console.log('net work error:' + this.error_message);
        } else if (error.error_code == 1100) {
          this.error_message = 'net work error:';
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  newGreetFlow(): void {
    this.submitted = false;
    this.creategreetflow = {
      slno: 0,
      subapp_name: '',
      old_level: '',
      level_name: '',
      next_level: '',
      input: '',
      appand_text: '',
      type_content:0,
      text_content: '',
      content_path: '',
      remarks: '',
      enable: 0


    };
  }
}

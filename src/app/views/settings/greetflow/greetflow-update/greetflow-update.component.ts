import { Component, OnInit, Inject } from '@angular/core';
import { MessagesService } from 'src/app/_service/messages.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { FormControl, Validators } from '@angular/forms';
import { VGCommonModule } from '../../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { greetflow } from 'src/app/material/settingsData';

@Component({
  selector: 'app-greetflow-update',
  templateUrl: './greetflow-update.component.html',
  styleUrl: './greetflow-update.component.scss'
})
export class GreetflowUpdateComponent extends VGCommonModule implements OnInit {
  cmscomponentsTypeIdControl = new FormControl('', Validators.required);
  message = '';
  levelNames = new Set<string>()
  updategreetflow = {} as greetflow;
  submitted: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<GreetflowUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: greetflow,
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage, messagesService);
    this.updategreetflow = this.data;
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    console.log('get Token');
    console.log('greetflow-update:location:' + window.location.href);
    if (this.checkToken('greetflow-update') == false) {
      return;
    }
    this.getLevelNames();

  }
  updatedoGreetFlow() {
    this.isError = false;
    this.error_message = '';
    this.submitted = true;

    var data2 =
      '{"slno":'+
      this.updategreetflow.slno+
      ',"subapp_name":"' +
      this.updategreetflow.subapp_name +
      '","level_name":"' +
      this.updategreetflow.level_name +
      '","old_level":"' +
      this.updategreetflow.old_level +
      '","next_level":"' +
      this.updategreetflow.next_level +
      '","input":"' +
      this.updategreetflow.input +
      '","appand_text":"' +
      this.updategreetflow.appand_text +
      '","type_content":' +
      this.updategreetflow.type_content +
      ',"text_content":"' +
      this.updategreetflow.text_content +
      '","content_path":"' +
      this.updategreetflow.content_path +
      '","remarks":"' +
      this.updategreetflow.remarks +
      '","enable":' +
      (this.updategreetflow.enable == 1 ? '1' : '0') +
      '}';
    // console.log('update greetflow :' + data2);
    if (this.updategreetflow.subapp_name == '') {
      this.isError = true;
      this.error_message = 'subapp_name must be entered';
      return;
    }
    console.log('json-greetflow-update :' + data2);
    this.messagesService
      .greetflowUpdateReport(this.updategreetflow.slno, data2)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.error_code == 1100) {
            this.redirectLogin('greetflow-update');
            this.error_message = 'not authorized:session expired, please login';
            return;
          }
          if (response == 'OK') {
            this.isError = false;
            this.message = 'greetflow was updated!';
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
  getLevelNames() {
    console.log(this.updategreetflow.subapp_name);
    this.messagesService.getLevelNames(this.updategreetflow.subapp_name).subscribe(
      (response) => {
        console.log(response);
        if(response=="{}"){
          this.error_message = 'no data';
          this.isError=true
          return;
        }
        if (response.error_code == 1100) {
          this.redirectLogin('greetflow-report');
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
  putGreetFlowUpdate(id: number): void {
    this.messagesService.read(id).subscribe(
      (cmstemplate) => {
        if (cmstemplate.error_code == 0) {
          console.log(this.updategreetflow);
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

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import * as XLSX from 'xlsx';
import { CampaignService } from 'src/app/_service/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerService } from '../../../_service/spinner.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ICampaignParamCnt,
  ICampaingImp,
  ICampaingImpMobileData,
  ICampaingImpMobileDataSchedule,
  ICampaingImpSchedule,
} from 'src/app/material/dynamic-table.module';
import { MessagesService } from 'src/app/_service/messages.service';

type AOA = any[][];

@Component({
  selector: 'app-vc-campaign-import',
  templateUrl: './vc-campaign-import.component.html',
  styleUrls: ['./vc-campaign-import.component.scss'],
})
export class VcCampaignImportComponent
  extends VGCommonModule
  implements OnInit {
  override error_message = '';
  override isError = false;
  submitted: boolean = false;
  campaignid = 0;
  param_count = 0;
  campigntype = '';
  start_date: string;
  end_date: string;
  start_time: number = 0;
  end_time: number = 0;
  form1: FormGroup;
  //form!: FormGroup;
  importData = {} as ICampaingImp;
  importDataScheudle = {} as ICampaingImpSchedule;

  //mobilenos = new String();
  exceldata: AOA = [];
  campaingParmsCnt = {} as ICampaignParamCnt;
  //wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  //isAuthenticated:boolean=false;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(public fb: FormBuilder,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    public spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: ICampaignParamCnt,
    public dialogRef: MatDialogRef<VcCampaignImportComponent>,
    public override tokenStorage: TokenStorageService,
    public override messagesService: MessagesService
  ) {
    super(tokenStorage, messagesService);
    this.form1 = fb.group({
      'campaignid': 0,
      'campaign_type': 0,
      'param_count': 0,
      'start_date': '',
      'end_date': '',
    });
    this.campaingParmsCnt = data;
    this.campaignid = this.campaingParmsCnt.campaignid;
    this.param_count = this.campaingParmsCnt.param_count;
    this.campigntype =
    this.campaingParmsCnt.campaign_type == 0 ? 'Buldk push' : 'Schedule';
    this.start_date = '';
    this.end_date = '';
  }
  onFileChangeSchedule(evt: any) {
    this.spinnerService.show();
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellText: false, cellDates: true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.exceldata = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1,raw:false,dateNF:'yyyy-mm-dd' });
      console.log('data:', this.exceldata);
      //var mobileno='';
      var i: number = 0
      var
        validCnt = 0,
        invalidCount = 0,
        j = 0;

      //const mobileData:ICampaingImpMobileData{mobileno:1 ; params:{"e"}};
      this.importDataScheudle.MobileData = [];
      this.exceldata.map((res) => {
        var mobileData = {} as ICampaingImpMobileDataSchedule;
        mobileData.mobileno = parseInt(res[0]);


       // console.log("mobileno " + mobileData.mobileno)
        if (
          mobileData.mobileno < 1000000000
        ) {
          invalidCount++;
         // console.log('invalid mobileno ', mobileData.mobileno);
          return
        }
        if (
          mobileData.mobileno < 9999999999
        ) {
          mobileData.mobileno += 910000000000;
        }

        if (
          mobileData.mobileno < 911000000000 ||
          mobileData.mobileno > 919999999999
        ) {
          invalidCount++;
          this.error_message = 'invalid mobileno ', mobileData.mobileno
          console.log(this.error_message);
          //return;
        } else {
          mobileData.start_date = (res[1]);
          if (mobileData.start_date.length > 10) {
            mobileData.start_date = mobileData.start_date.substring(0, 10)
          }
          if (mobileData.start_date.length != 10) {
            this.error_message = 'invalid start date ' + mobileData.start_date
            console.log(this.error_message);
            //return;
          }
          //mobileData.param = [];
          for (j = 0; j < this.param_count; j++) {
            if (res[j + 2] == null) {
              console.log('paramater end');
              this.error_message = "paramater count not match " + j
              this.isError = true
              break;
            }
            if (res.length < this.param_count + 2) {
              console.log('paramater end');
              this.error_message = "paramater count not match " + j
              this.isError = true
              break;
            }
            if (j == 0) {
              mobileData.param1 = String(res[j + 2]);
             // console.log('paramater: ', mobileData.param1);
            }
            if (j == 1) {
              mobileData.param2 = String(res[j + 2]);
             // console.log('paramater: ', mobileData.param2);
            }
            if (j == 2) {
              mobileData.param3 = String(res[j + 2]);
              //console.log('paramater: ', mobileData.param3);
            }
            if (j == 3) {
              mobileData.param4 = String(res[j + 2]);
             // console.log('paramater: ', mobileData.param4);
            }

          }//for

          validCnt++;
          this.importDataScheudle.MobileData.push(mobileData);
         /* console.log(
            'data added: ',
            JSON.stringify(this.importDataScheudle.MobileData[i])
          );*/
          i++;
        }
      });
      this.spinnerService.hide();
      /*var i = this.mobilenos.indexOf(',');
      console.log('indexof:' + i);
      if (i == 0) {
        this.mobilenos = this.mobilenos.substring(1);
      }*/
      if (i == 0) {
        this.isError = true
        this.error_message = "no data " + this.error_message
        reader.readAsBinaryString(target.files[0]);
        return
      }
      if (this.importDataScheudle.MobileData.length == 0) {
        this.isError = true
        this.error_message = "no data " + this.error_message
      }
    };
    reader.readAsBinaryString(target.files[0]);
    

  }
  onFileChange(evt: any) {
    if (this.campaingParmsCnt.campaign_type == 1) {
      this.onFileChangeSchedule(evt);
      return;
    }
    this.spinnerService.show();
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.exceldata = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('data:', this.exceldata);
      //var mobileno='';
      var i = 0,
        validCnt = 0,
        invalidCount = 0,
        j = 0;

      //const mobileData:ICampaingImpMobileData{mobileno:1 ; params:{"e"}};
      this.importData.MobileData = [];
      this.exceldata.map((res) => {
        var mobileData = {} as ICampaingImpMobileData;
        mobileData.mobileno = parseInt(res[0]);
        if (
          mobileData.mobileno < 1000000000
        ) {
          invalidCount++;
         // console.log('invalid mobileno ', mobileData.mobileno);
          return
        }
        if (
          mobileData.mobileno < 9999999999
        ) {
          mobileData.mobileno += 910000000000;
        }

        if (
          mobileData.mobileno < 911000000000 ||
          mobileData.mobileno > 919999999999
        ) {
          invalidCount++;
         // console.log('invalid mobileno ', mobileData.mobileno);
          return;
        } else {
          mobileData.params = [];
          for (j = 0; j < this.param_count; j++) {
            if (res[j + 1] == null) {
              console.log('paramater end');
              this.error_message = "paramater count not match " + j
              this.isError = true
              break;
            }
            mobileData.params.push(String(res[j + 1]));
           // console.log('paramater: ', mobileData.params[j]);
          }

          validCnt++;
          this.importData.MobileData.push(mobileData);
         /* console.log(
            'data added: ',
            JSON.stringify(this.importData.MobileData[i])
          );*/
          i++;
        }
      });
      this.spinnerService.hide();
      /*var i = this.mobilenos.indexOf(',');
      console.log('indexof:' + i);
      if (i == 0) {
        this.mobilenos = this.mobilenos.substring(1);
      }*/
    };

    reader.readAsBinaryString(target.files[0]);
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  udateMobileDataSchedule(): void {
    this.importDataScheudle.campaign_id = this.campaignid;
    this.importDataScheudle.schedule_type = 0;

    console.log(JSON.stringify(this.importDataScheudle));


    if (this.campaignid == 0) {
      this.isError = true;
      console.log("Campaign Id: " + this.campaignid)
      this.error_message = 'Please enter campaign Id';
      this.submitted = true;
      return;
    }
    if (this.importDataScheudle.MobileData.length == 0) {
      this.isError = true;
      console.log("Is Error3 :" + this.importDataScheudle.MobileData.length);
      this.error_message = 'No date selected';
      this.submitted = true;
      return;
    }
    if (this.campaingParmsCnt.campaign_type != 1) {
      this.isError = true;
      console.log("Is Error4: " + this.campaingParmsCnt.campaign_type);
      this.error_message = 'invalid campaign type';
      this.submitted = true;
      return;
    }
    this.spinnerService.show();
    //console.log(data2);
    this.campaignService.importVCCampaignMobileDataSchedule(this.importDataScheudle).subscribe(
      (response) => {
        this.submitted = true;
        this.spinnerService.hide();
        //console.log('spinner show: '+this.spinnerService.hide());
        console.log(response);
        if (response.error_code == 0) {
          //this.isError = false;
          //this.isError = true;
          this.error_message =
            'campaign is successfully inserted ' + response.error_message;
          console.log('response:' + response.error_message);
          //this.message = 'The campaign was updated!';
        } else if (response.error_code == 1100) {
          //this.redirectLogin('vc-campaign');
          this.error_message = 'not authorized:no session,please login';
          this.isError = true;
          return;
        } else if (response.VcCampaignId == this.campaignid) {
          this.isError = false;
          console.log('response:' + response);
          //this.error_message = response.error_message;
        } else {
          this.isError = true;
          this.error_message = 'error ' + response.error_message;
        }
      },
      (error) => {
       // this.hideloader();
       // console.log('hideloader: '+this.hideloader);
        this.submitted = true;
        this.spinnerService.hide();
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
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );
  }
  udateMobileData(): void {
    this.isError=false;
    if (this.campaingParmsCnt.campaign_type == 1) {
      this.udateMobileDataSchedule();
      return;
    }
    this.importData.campaign_id = this.campaignid;
    this.importData.start_date = this.start_date.replace("T", " ");
    this.importData.end_date = this.end_date.replace("T", " ");
    console.log(JSON.stringify(this.importData));
    if (this.importData.start_date.length == 16) {
      this.importData.start_date+=":00"
    }
    if (this.importData.start_date.length != 19) {
      this.submitted = true;
      this.isError = true;
      console.log("isError1:" + this.importData.start_date)
      this.error_message = 'invalid start date';
      return;
    }
    if (this.importData.end_date.length == 16) {
      this.importData.end_date+=":00"
    }
    if (this.importData.end_date.length != 19) {
      this.submitted = true;
      this.isError = true;
      console.log("Is Error2: " + this.importData.end_date)
      this.error_message = 'invalid end date';
      return;
    }

    if (this.campaignid == 0) {
      this.isError = true;
      console.log("Campaign Id: " + this.campaignid)
      this.error_message = 'Please enter campaign Id';
      this.submitted = true;
      return;
    }
    if (this.importData.MobileData.length == 0) {
      this.isError = true;
      console.log("Is Error3 :" + this.importData.MobileData.length);
      this.error_message = 'No date selected';
      this.submitted = true;
      return;
    }
    if (this.campaingParmsCnt.campaign_type == 1) {
      this.isError = true;
      console.log("Is Error4: " + this.campaingParmsCnt.campaign_type);
      this.error_message = 'Schedule campaign not at implimented';
      this.submitted = true;
      return;
    }
    this.spinnerService.show()
    //console.log(data2);
    this.campaignService.importVCCampaignMobileData(this.importData).subscribe(
      (response) => {
      //  this.hideloader();
        this.submitted = true;
        this.spinnerService.hide();
        console.log(response);
        if (response.error_code == 0) {
          //this.isError = false;
          //this.isError = true;
          this.error_message =
            'campaign is successfully inserted ' + response.error_message;
          console.log('response:' + response.error_message);
          //this.message = 'The campaign was updated!';
        } else if (response.error_code == 1100) {
          //this.redirectLogin('vc-campaign');
          this.error_message = 'not authorized:no session,please login';
          this.isError = true;
          return;
        } else if (response.VcCampaignId == this.campaignid) {
          this.isError = false;
          console.log('response:' + response);
          //this.error_message = response.error_message;
        } else {
          this.isError = true;
          this.error_message = 'error ' + response.error_message;
        }
      },
      (error) => {
       // this.hideloader();
        this.submitted = true;
        this.spinnerService.hide();
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
        } else {
          this.error_message = 'net work error:' + error;
        }
      }
    );
  }
  ngOnInit(): void {
    console.log('vc-campaign-import:location:' + window.location.href);
    if (this.checkToken('vc-campaign') == false) {
      return;
    }
  }
 /* hideloader() {
    document.getElementById('loading')?.setAttribute('hidden', 'hidden');

  }*/
}

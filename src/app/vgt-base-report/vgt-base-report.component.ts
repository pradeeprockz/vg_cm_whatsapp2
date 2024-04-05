import { Component, OnInit } from '@angular/core';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { MessagesService,UrlObj } from '../_service/messages.service';
import { ICommonData } from '../material/SummaryReports';


@Component({
  selector: 'app-vgt-base-report',
  templateUrl: './vgt-base-report.component.html',
  styleUrls: ['./vgt-base-report.component.css'],
})



export abstract class VgtBaseReportComponent implements OnInit {
  public gridSettings: GridSettings;
  public mode = false;
  public selectedConfig: any;
  public newConfig: any;
  years: any;
  yymmdd1: any;
  iCommonData = {} as ICommonData;
  urlObj: UrlObj = UrlObj.UnKnown;
  yymmonth: string = '';
  dialogTitle = '';
  dialogContent = '';
  date: string = ""
  constructor(public messageService: MessagesService) {
    this.gridSettings = {columnWidth: 140} as GridSettings;
   
}
  reload() {
    this.readChannels();

  }
  getPivotData(): any {
    return this.iCommonData.DataArr;
  }
 
  public reportConfig(e: any): void {
    this.newConfig = e;
  }

  assigneData(data1: any) { }
  setUrlObj() { }
  readChannels(): void {
    this.setUrlObj();
    this.messageService.getData(this.urlObj,this.yymmonth).subscribe(
      (message) => {
        this.hideloader();
        console.log(message);
        this.assigneData(message);
        if (this.iCommonData.error_code === 0) {
          console.log('error_code===0');
          if (!this.iCommonData.DataArr) {
            this.dialogTitle = 'VGTReport Error';
            this.dialogContent = 'Data error: No data';
            this.iCommonData.DataArr = [{ 'no data': 'no data' }];
            console.log("iCommonData.DataArr is null");
            return;
          }

        } else {
          console.log("error_code !==0");
          this.iCommonData.DataArr = [{ 'no data': 'no data' }];
          this.dialogTitle = 'VGTReport Error';
          this.dialogContent = 'Data error:' + this.iCommonData.error_message;
          if (this.iCommonData.error_message.indexOf("doesn't exist") != -1) {
            this.dialogContent = 'Error:data does not exist';
          }
        }
      },
      (error) => {
        this.hideloader();
        console.log(error);
        if (error.status == 0) {
          this.dialogTitle = 'VGTReport Error';
          console.log('net work error:' + this.dialogContent);
          this.dialogContent = 'net work error';
        } else {
          this.dialogTitle = 'VGTReport Error';
          this.dialogContent = 'no data';
          this.dialogContent = 'net work error:' + error.message;
        }
        this.iCommonData.DataArr = [{ 'no data': 'no data' }];
      }
    );
  }

  ngOnInit(): void {
    var dt = new Date();
    var month = dt.getMonth();
    this.yymmonth = dt.getFullYear().toString();
    this.date = this.yymmonth + "-"
    this.yymmonth =
      this.yymmonth.substring(2, 4) +
      (month < 9 ? '0' + (month + 1) : month + 1);

    this.date +=  (month < 9 ? '0' + (month + 1) : month + 1);
    console.log("Full Date: "+this.date)
    this.readChannels();
  }
  hideloader() {
    document.getElementById('loading')?.setAttribute('hidden', 'hidden');

  }
}
 
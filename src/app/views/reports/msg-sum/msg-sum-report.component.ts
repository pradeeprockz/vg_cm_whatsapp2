import { VGCommonModule } from '../../CommonModule'
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageSummaryResp, MessageSummary } from '../../../material/SummaryReports';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { MessagesService } from 'src/app/_service/messages.service';
import * as _moment from 'moment';


/*interface Month {
  month: string;
  value: string;
}*/

@Component({
  selector: 'app-msg-sum',
  templateUrl: './msg-sum-report.component.html',
  styleUrls: ['./msg-sum-report.component.scss'],
})
export class MsgSumReportComponent extends VGCommonModule
  implements OnInit, AfterViewInit {
  submitted: boolean = false;
  cnt: number = 0;
  direction: number = 0;
  agent_id: number = 0;
  customer: string = '';
  client_no: string = '';
  date: string = '';
  delivered_code: number = 0;
  startDt1: number = 0;
  startDt2: number = 0;
  resp = {} as MessageSummaryResp;
  years: any;
  yymmdd1: any;
  //month = {} as Month;
  dateType: string = "";
  YYMM: string = "";
  YYMMDD: string="";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
  ) {
    super(tokenStorage, messagesService);
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    var dt=new Date();
    var month=(dt.getMonth()+1)+"";
    if(month.length==1)month="0"+month;
    var day=dt.getDate()+""
    if(day.length==1)day="0"+day;
    this.startDt1= dt.getFullYear();
    this.YYMM=dt.getFullYear()+"-"+month;
    this.YYMMDD=dt.getFullYear()+"-"+month+"-"+day;
    
  }
  displayedColumns: string[] = [
    "count",
    "direction",
    "client_no",
    "date",
    "delivered_code",
    "agent_id"
  ];
  //dataSource = new MatTableDataSource<IChannelInfo>();
  dataSource: MatTableDataSource<MessageSummary>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log('afterFilter:firstpage');
    }
    console.log('afterFilter');
  }
  dateSubmit() {
    this.dataSource = new MatTableDataSource<MessageSummary>;
    console.log("datetype:" + this.dateType)
   // this.yearmonth
    var reqDate = "";
    if (this.dateType == "year") {
      reqDate = (this.startDt1 % 100)+"";
      console.log("reqDate1 " + reqDate )
    } else if (this.dateType == "yearmonth") {
      reqDate = this.YYMM+"" ;   //2023-09 ; 2024-01
      console.log("reqDate2 " + reqDate )
      reqDate=reqDate.replaceAll("-","")
      console.log("reqDate3 " + reqDate )
      reqDate=reqDate.substring(2,6)
      console.log("req: " + reqDate + " YEARMONTH: " + this.YYMM)
    } else if (this.dateType == "yearmonthdate") {
      console.log("ymd: "+this.YYMMDD)
      var date = new Date(this.YYMMDD),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      var fullDate = [date.getFullYear().toString().substr(-2), mnth, day].join("")
      console.log("yymmdd: " + fullDate);
      reqDate = fullDate
      console.log("FullDate: " + reqDate + " reqDate: " + fullDate)
    } else {
      console.log("reqDate4 error ")
      return true
    }

    this.messagesService.getMessageSummaryReport(reqDate).subscribe(
      (response) => {
        this.hideloader();
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('msg-summary-report');
          this.error_message = 'not authorized:no session,please login'
          this.isError = true
          return;
        }

        this.resp = response;
        if (this.resp.error_code == 0) {
          this.isError = false;
          if (this.resp.message_summary === null) {
            console.log(response);
            this.isError = true;
            this.error_message = "no data"
            return
          } else if (this.resp.message_summary.length == 0) {
            console.log(response);
            this.isError = true;
            this.error_message = "no data"
            return
          } else {
            console.log("define ok");
          }

          this.dataSource = new MatTableDataSource(this.resp.message_summary);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isError = true;
          this.error_message = this.resp.error_message;
        }
      },
      (error) => {
        this.hideloader();
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
    return;
  }

  hideloader() {
    document.getElementById('loading')?.setAttribute('hidden', 'hidden');
  }

  reload() {
    this.ngOnInit();
  }
  ngOnInit(): void {
    if (this.checkToken('msg-sum-report') == false) {
      return;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('afterViewInit:paginator:' + this.paginator);
  }
  updateDate(date:string){
    var year,month,dateO: string
    if(date.length==2){

    }else if(date.length==4){
      year="20"+date.substring(0,2)
      month="-"+date.substring(2,4)
      return year+month
    }else if(date.length==6){
      year="20"+date.substring(0,2)
      month="-"+date.substring(2,4)
      dateO="-"+date.substring(4,6)
      return year+month+dateO
    }
    return date;
  }
  getDataLink(date:number){
    console.log("getDataLink:"+date)
    if(date<9999){
      this.dateType = "yearmonth"
      this.YYMM=(2000+Math.round(date/100))+"-"+(Math.round(date%100)<10?"0"+Math.round(date%100):"0"+Math.round(date%100))
      
    }else if(date<999999){
      this.dateType = "yearmonthdate"
      //this.YYMMDD= (new Date(date/10000+2000,date/100%100-1,date%100)).toString()
      this.YYMMDD= (Math.round(date/10000)+2000)+"-"+"0"+Math.round(date/100%100)+"-"+"0"+Math.round(date%100)
      console.log(this.YYMMDD )
    }
    this.dateSubmit();
  }
}

import { VGCommonModule } from '../../CommonModule'
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { out_message_summ } from '../../../material/SummaryReports';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { MessagesService } from 'src/app/_service/messages.service';

@Component({
  selector: 'app-msg-out-summary-report',
  templateUrl: './msg-out-summary-report.component.html',
  styleUrl: './msg-out-summary-report.component.scss'
})
export class MsgOutSummaryReportComponent extends VGCommonModule implements OnInit, AfterViewInit {
  submitted: boolean = false;
  cnt: number = 0;
  date: number = 0;
  modifiedDate: string = '';
  delivered_code: number = 0;
  dateType: string = "";
  YYMM: string = "";
  resp = {} as out_message_summ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
  ) {
    super(tokenStorage, messagesService);
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();

  }

  displayedColumns: string[] = [
    "Cnt",
    "Insdate",
    "Status"

  ];
  //dataSource = new MatTableDataSource<IChannelInfo>();
  dataSource: MatTableDataSource<out_message_summ>;

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
    this.dataSource = new MatTableDataSource<out_message_summ>;
    var reqDate = 0;
    console.log("date :" + this.date);
    var parts = this.date.toString().split('-')
    if (parts.length === 2) {
      this.modifiedDate = parts[0].substring(2) + parts[1]
    } else if (this.dateType == "yearmonthdate") {
      console.log("ymd: " + this.YYMM)
      var date = new Date(this.YYMM),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      var fullDate = [date.getFullYear().toString().substr(-2), mnth, day].join("")
      console.log("yymmdd: " + fullDate);
      reqDate = parseInt(fullDate)
      console.log("FullDate: " + reqDate + " reqDate: " + fullDate)
    } else {
      console.log("reqDate4 error ")
      return true
    }
    this.messagesService.getOutMsgSummReport(this.modifiedDate).subscribe(
      (response) => {
        this.hideloader();
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('out-msg-summary-report');
          this.error_message = 'not authorized:no session,please login'
          this.isError = true
          return;
        }

        let resp: string;
        resp = response;
        if (resp.indexOf('Error:') != -1) {
          this.isError = true;
          this.error_message = resp;
          console.log('errir:' + resp);
          return;
        }

        console.log('ok:232');
        this.isError = false;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.hideloader();
        this.isError = false;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'error code:';
          console.log('error code:' + this.error_message);
        } else if (this.resp.out_msg_summ.length == 0) {
          this.error_message = 'no data :' + this.error_message
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
    if (this.checkToken('out-msg-summary-report') == false) {
      return;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('afterViewInit:paginator:' + this.paginator);
  }
}

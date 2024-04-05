import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { cms_temp_wa_comp_header_params } from '../../../material/CmsTempWaCompHeaderParams';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { CmsTempWaCompHeaderParamsCreateComponent } from '../cms-temp-wa-comp-header-params-create/cms-temp-wa-comp-header-params-create.component';
import { CmsTempWaCompHeaderParamsUpdateComponent } from '../cms-temp-wa-comp-header-params-update/cms-temp-wa-comp-header-params-update.component';
import { CmsTempWaCompHeaderParamsDeleteComponent } from '../cms-temp-wa-comp-header-params-delete/cms-temp-wa-comp-header-params-delete.component';



@Component({
  selector: 'app-cms-temp-wa-comp-header-params-report',
  templateUrl: './cms-temp-wa-comp-header-params-report.component.html',
  styleUrl: './cms-temp-wa-comp-header-params-report.component.scss'
})
export class CmsTempWaCompHeaderParamsReportComponent extends VGCommonModule implements OnInit, AfterViewInit {
  submitted: boolean = false;
  cmstempwacompheaderparams = {} as cms_temp_wa_comp_header_params[];
  updatecmstempwacompheaderparams = {} as cms_temp_wa_comp_header_params;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  constructor(
    public override messagesService: MessagesService,
    public override tokenStorage: TokenStorageService,
    private dialog: MatDialog
  ) {
    super(tokenStorage, messagesService);
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
  }
  displayedColumns: string[] = [
    "id",
    "client_number",
    "sname",
    "edit",
    "delete",
    "components_id",
    "type",
    "param_name",
    "media_name",
    "media_uri",
    "mine_type",
    "msg_text",
    "currency_fallback_value",
    "current_code",
    "date_time",
    "enable",
    "is_edit"
  ];
  dataSource: MatTableDataSource<cms_temp_wa_comp_header_params>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log('afterFilter:firstpage');
    }
    console.log('afterFilter');
  }
  create() {
    const dialogRef = this.dialog.open(CmsTempWaCompHeaderParamsCreateComponent, {
      width: '850px',
      height: '700px',
      data:this.cmstempwacompheaderparams
    });
    dialogRef.afterClosed().subscribe(
      (response) => {
        console.log("response:" + response)
        this.reload();
      },
      (event) => {
        console.log("event:" + event)
        this.reload();
      }
    )
  }

  update(data: cms_temp_wa_comp_header_params) {
    this.updatecmstempwacompheaderparams = data;
    const dialogRef = this.dialog.open(CmsTempWaCompHeaderParamsUpdateComponent, {
      width: '850px',
      height: '700px',
      data: this.updatecmstempwacompheaderparams,
    });
    dialogRef.afterClosed().subscribe(
      (response) => {
        console.log("response:" + response)
        this.reload();
      },
      (event) => {
        console.log("event:" + event)
        this.reload();
      }
    )
  }

  deletef(data1: cms_temp_wa_comp_header_params) {
    const dialogRef = this.dialog.open(CmsTempWaCompHeaderParamsDeleteComponent, {
      data: data1,
    });
    dialogRef.afterClosed().subscribe(
      (response) => {
        console.log("response:" + response)
        this.reload();
      },
      (event) => {
        console.log("event:" + event)
        this.reload();
      }
    )
  }

  reload() {
    this.ngOnInit();
  }
  ngOnInit(): void {
    console.log('cms-temp-wacomp-header-params-report:location:' + window.location.href);
    if (this.checkToken('cms-template-report') == false) {
      return;
    }
    this.messagesService.getCmsTempWaCompHeaderParamsReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-temp-wacomp-header-params-report');
          this.error_message = 'not authorized:no session,please login';
          return;
        }
        let resp: string;
        resp = response;
        if (resp.indexOf('<html') != -1) {
          this.isError = true;
          this.error_message = resp;
          console.log('errir:' + resp);
          return;
        } else {
          console.log("define ok");
        }

        this.cmstempwacompheaderparams = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.cmstempwacompheaderparams);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('afterViewInit:paginator:' + this.paginator);
  }
}

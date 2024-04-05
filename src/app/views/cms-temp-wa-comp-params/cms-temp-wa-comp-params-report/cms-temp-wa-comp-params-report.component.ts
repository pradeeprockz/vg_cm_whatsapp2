import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cms_temp_wa_comp_params } from '../../../material/ ICmsTempWaCompParams';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { CmsTempWaCompParamsCreateComponent } from '../cms-temp-wa-comp-params-create/cms-temp-wa-comp-params-create.component';
import { CmsTempWaCompParamsUpdateComponent } from '../cms-temp-wa-comp-params-update/cms-temp-wa-comp-params-update.component';
import { CmsTempWaCompParamsDeleteComponent } from '../cms-temp-wa-comp-params-delete/cms-temp-wa-comp-params-delete.component';

@Component({
  selector: 'app-cms-temp-wa-comp-params-report',
  templateUrl: './cms-temp-wa-comp-params-report.component.html',
  styleUrl: './cms-temp-wa-comp-params-report.component.scss'
})
export class CmsTempWaCompParamsReportComponent extends VGCommonModule implements OnInit,AfterViewInit {
  submitted: boolean = false;
  cmstempwacompparams = {} as Cms_temp_wa_comp_params[];
  updatecmstempwacompparams = {} as Cms_temp_wa_comp_params;
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
    "mime_type",
    "msg_text",
    "currency_fallback_value",
    "currency_code",
    "date_time",
    "enable",
    "is_edit"
  ];
  dataSource: MatTableDataSource<Cms_temp_wa_comp_params>;

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
    const dialogRef = this.dialog.open(CmsTempWaCompParamsCreateComponent, {
     width: '850px',
      height: '700px',
      data:this.cmstempwacompparams
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

  update(data: Cms_temp_wa_comp_params) {
    this.updatecmstempwacompparams = data;
    const dialogRef = this.dialog.open(CmsTempWaCompParamsUpdateComponent, {
      width: '850px',
      height: '600px',
      data: this.updatecmstempwacompparams,
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

  deletef(data1: Cms_temp_wa_comp_params) {
    const dialogRef = this.dialog.open(CmsTempWaCompParamsDeleteComponent, {
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
    console.log('cms-temp-wa-comp-params-report:location:' + window.location.href);
    if (this.checkToken('cms-template-report') == false) {
      return;
    }
    this.messagesService.getCmsTempWaCompParamsReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-temp-wa-comp-params');
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

        this.cmstempwacompparams = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.cmstempwacompparams);
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

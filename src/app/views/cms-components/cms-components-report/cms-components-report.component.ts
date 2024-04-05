import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cms_components } from '../../../material/cmscomponentData';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { CmsComponentsCreateComponent } from '../cms-components-create/cms-components-create.component';
import { CmsComponentsUpdateComponent } from '../cms-components-update/cms-components-update.component';
import { CmsComponentsDeleteComponent } from '../cms-components-delete/cms-components-delete.component';
import { create_cms_components } from 'src/app/material/cmstemplatedata';
import { CmsTempWaCompParamsCreateComponent } from '../../cms-temp-wa-comp-params/cms-temp-wa-comp-params-create/cms-temp-wa-comp-params-create.component';
import { CmsTempWaCompHeaderParamsCreateComponent } from '../../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-create/cms-temp-wa-comp-header-params-create.component';



@Component({
  selector: 'app-cms-components-report',
  templateUrl: './cms-components-report.component.html',
  styleUrl: './cms-components-report.component.scss'
})
export class CmsComponentsReportComponent extends VGCommonModule
 implements OnInit,AfterViewInit {
  submitted: boolean = false;
  cmscomponents = {} as Cms_components[];
  updatecmscomponents = {} as Cms_components;
  createcmscomponents = {} as create_cms_components
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
    "createparameter",
    "type",
    "parameters",
    "sub_type",
    "index"
  ];
  dataSource: MatTableDataSource<Cms_components>;

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
    const dialogRef = this.dialog.open(CmsComponentsCreateComponent, {
      width: '750px',
      height: '500px',
      data:this.updatecmscomponents
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
  createParameter(data: Cms_components) {
    //this.updatecmscomponents = data;
    var dialogRef1;
    if (data.type == "body") {
       dialogRef1 = this.dialog.open(CmsTempWaCompParamsCreateComponent, {
        width: '850px',
        height: '600px',
        data: data,
      });
    } else if (data.type == "header") {
      dialogRef1 = this.dialog.open(CmsTempWaCompHeaderParamsCreateComponent, {
        width: '850px',
        height: '600px',
        data: data,
      });

    }else{
      //invalid type shoudle be 'body' or 'header'
      return
    }
    
    console.log("Create Parameter: " + this.createcmscomponents + "create Parameter 1 :"+this.updatecmscomponents)
    dialogRef1.afterClosed().subscribe(
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

  update(data: Cms_components) {
    this.updatecmscomponents = data;
    const dialogRef = this.dialog.open(CmsComponentsUpdateComponent, {
      width: '750px',
      height: '500px',
      data: this.updatecmscomponents,
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

  deletef(data1: Cms_components) {
    const dialogRef = this.dialog.open(CmsComponentsDeleteComponent, {
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
    console.log('cms-components-report:location:' + window.location.href);
    if (this.checkToken('cms-template-report') == false) {
      return;
    }
    this.messagesService.getCmsComponentsReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-components-report');
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

        this.cmscomponents = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.cmscomponents);
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

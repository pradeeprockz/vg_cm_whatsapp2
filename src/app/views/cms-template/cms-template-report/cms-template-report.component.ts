import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cms_template,create_cms_components } from '../../../material/cmstemplatedata';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { CmsTemplateCreateComponent } from '../cms-template-create/cms-template-create.component';
import { CmsTemplateUpdateComponent } from '../cms-template-update/cms-template-update.component';
import { CmsTemplateDeleteComponent } from '../cms-template-delete/cms-template-delete.component';
import { CmsComponentsCreateComponent } from '../../cms-components/cms-components-create/cms-components-create.component';



@Component({
  selector: 'app-cms-template-report',
  templateUrl: './cms-template-report.component.html',
  styleUrl: './cms-template-report.component.scss'
}) 
export class CmsTemplateReportComponent extends VGCommonModule implements OnInit, AfterViewInit {
  submitted: boolean = false;
  cmstemplate = {} as Cms_template[];
  createcmstemplate = {} as Cms_template;
  templateWaComponents = {} as create_cms_components;
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
    "createcomponent",
    "edit",
    "delete",
    "template_wa_Namespace",
    "template_wa_elementname",
    "language_policy",
    "language_code",
    "template_wa_components",
    "msg_text",
    "contacts",
    "location_latitude",
    "location_longitude",
    "lable",
    "search_query",
    "media_name",
    "media_uri",
    "mime_type",
    "enable"
  ];
  dataSource: MatTableDataSource<Cms_template>;

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
    const dialogRef = this.dialog.open(CmsTemplateCreateComponent, {
      width: '750px',
      height: '800px',
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
  createComponent(clientNumber:string,sName:string,templateWaComponents:number) {
    this.createcmstemplate.client_number = clientNumber;
    this.createcmstemplate.sname = sName
    this.createcmstemplate.template_wa_components = templateWaComponents
    const dialogRef = this.dialog.open(CmsComponentsCreateComponent, {
      width:'750px',
      height:'500px',
      data: this.createcmstemplate,
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

  update(data: Cms_template) {
    this.createcmstemplate = data;
    const dialogRef = this.dialog.open(CmsTemplateUpdateComponent, {
      width:'750px',
      height:'800px',
      data: this.createcmstemplate,
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

  deletef(data1: Cms_template) {
    const dialogRef = this.dialog.open(CmsTemplateDeleteComponent, {
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
    console.log('cms-template-report:location:' + window.location.href);
    if (this.checkToken('cms-template-report') == false) {
      return;
    }
    this.messagesService.getCmsTemlateReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('cms-template-report');
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

        this.cmstemplate = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.cmstemplate);
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

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { wa_block } from '../../../../material/settingsData';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../../CommonModule';
import { WaBlockCreateComponent } from '../wa-block-create/wa-block-create.component';
import { WaBlockUpdateComponent } from '../wa-block-update/wa-block-update.component';
import { WaBlockDeleteComponent } from '../wa-block-delete/wa-block-delete.component';

@Component({
  selector: 'app-wa-block-report',
  templateUrl: './wa-block-report.component.html',
  styleUrl: './wa-block-report.component.scss'
})
export class WaBlockReportComponent extends VGCommonModule implements OnInit, AfterViewInit {
  submitted: boolean = false;
  wablock = {} as wa_block[];
  updatewablock = {} as wa_block;
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
    "customer_number",
    "in_out",
    "edit",
    "delete",
    "client_id",
    "enable",
    "instime"
  ];
  dataSource: MatTableDataSource<wa_block>;

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
    const dialogRef = this.dialog.open(WaBlockCreateComponent, {
      width: '850px',
      height: '350px',
      data: this.wablock
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

  update(data: wa_block) {
    this.updatewablock = data;
    const dialogRef = this.dialog.open(WaBlockUpdateComponent, {
      width: '850px',
      height: '350px',
      data: this.updatewablock,
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

  deletef(data1: wa_block) {
    const dialogRef = this.dialog.open(WaBlockDeleteComponent, {
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
    console.log('wa_block-report:location:' + window.location.href);
    if (this.checkToken('cms-template-report') == false) {
      return;
    }
    this.messagesService.getWaBlockReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('wa_block');
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

        this.wablock = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.wablock);
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

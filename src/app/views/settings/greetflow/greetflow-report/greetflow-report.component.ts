import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { greetflow } from '../../../../material/settingsData';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../../CommonModule';
import { GreetflowCreateComponent } from '../greetflow-create/greetflow-create.component';
import { GreetflowUpdateComponent } from '../greetflow-update/greetflow-update.component';
import { GreetflowDeleteComponent } from '../greetflow-delete/greetflow-delete.component';
import { GreetflowLevelNameComponent } from '../../greetflow-level-name/greetflow-level-name.component';

@Component({
  selector: 'app-greetflow-report',
  templateUrl: './greetflow-report.component.html',
  styleUrl: './greetflow-report.component.scss'
})
export class GreetflowReportComponent extends VGCommonModule implements OnInit,AfterViewInit {
  submitted: boolean = false;
  greetflow = {} as greetflow[];
  updategreetflow = {} as greetflow;
  subappNames = new Set<string>();
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
    "slno",
    "subapp_name",
    "createlevelnames",
    "edit",
    "delete",
    "level_name",
    "old_level",
    "next_level",
    "input",
    "appand_text",
    "type_content",
    "text_content",
    "content_path",
    "enable",
    "remarks"
  ];
  dataSource: MatTableDataSource<greetflow>;

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
    const dialogRef = this.dialog.open(GreetflowCreateComponent, {
      width: '850px',
      height: '600px',
      data: this.greetflow
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

  update(data: greetflow) {
    this.updategreetflow = data;
    const dialogRef = this.dialog.open(GreetflowUpdateComponent, {
      width: '850px',
      height: '600px',
      data: this.updategreetflow,
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

  deletef(data1: greetflow) {
    const dialogRef = this.dialog.open(GreetflowDeleteComponent, {
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

  createLevelNames(subAppName:string,oldLevel:string,nextLevel:string,
    input:string,appandText:string,typeContent:number,textContent:string,
    contentPath:string,remarks:string,enable:number){
    this.updategreetflow.subapp_name = subAppName
    this.updategreetflow.old_level = oldLevel
    this.updategreetflow.next_level = nextLevel
    this.updategreetflow.input = input
    this.updategreetflow.appand_text = appandText
    this.updategreetflow.type_content = typeContent
    this.updategreetflow.text_content = textContent
    this.updategreetflow.content_path = contentPath
    this.updategreetflow.remarks = remarks
    this.updategreetflow.enable = enable

    const dialogRef = this.dialog.open(GreetflowLevelNameComponent, {
      width: '850px',
      height: '600px',
      data: this.updategreetflow
    }); 
  }

  reload() {
    this.ngOnInit();
  }
  ngOnInit(): void {
    console.log('greetflow-report:location:' + window.location.href);
    if (this.checkToken('greetflow-report') == false) {
      return;
    }
    this.messagesService.getGreetflowReport().subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('greetflow');
          this.error_message = 'not authorized:no session,please login';
          return;
        }
        this.subappNames.add("");
        response.forEach((item: any) => {
          this.subappNames.add(item.subappname);
        })
        this.isError = false;
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
        this.subappNames.add("");
        response.forEach((item: greetflow) => {
          this.subappNames.add(item.subapp_name);
        })

        this.greetflow = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.greetflow);
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
  getSubappFlow(){
    console.log("getGreetFlow"+this.updategreetflow.subapp_name);
    this.messagesService.getGreetFlowSubapp(this.updategreetflow.subapp_name).subscribe(
      (response) => {
        this.submitted = true;
        console.log(response);
        if (response.error_code == 1100) {
          this.redirectLogin('greetflow');
          this.error_message = 'not authorized:no session,please login';
          return;
        }
        this.subappNames.add("");
        response.forEach((item: any) => {
          this.subappNames.add(item.subappname);
        })
        this.isError = false;
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
        this.subappNames.add("");
        response.forEach((item: greetflow) => {
          this.subappNames.add(item.subapp_name);
        })

        this.greetflow = response
        console.log(response);
        this.dataSource = new MatTableDataSource(this.greetflow);
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

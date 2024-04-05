import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WaCampaignReportData } from '../../../material/ICampaignData';
import {
  ICampaignData,
  ICampaignParamCnt,
} from '../../../material/dynamic-table.module';
import { MessagesService } from 'src/app/_service/messages.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { VcCampaignImportComponent } from '../vc-campaign-import/vc-campaign-import.component';

@Component({
  selector: 'app-vc-campaign',
  templateUrl: './vc-campaign.component.html',
  styleUrls: ['./vc-campaign.component.scss'],
})
export class VcCampaignComponent
  extends VGCommonModule
  implements OnInit, AfterViewInit
{
  displayedColumns: string[] = [
    'id',
    'cname',
    'template_sname',
    'param_count',
    'status',
    'campaign_type',
    'import',
    'agent_id',
    'start_date',
    'end_date',
    'day_start',
    'day_end',
    'instime',
  ];

  dataSource: MatTableDataSource<WaCampaignReportData>;
  customerId: string = '';
  campaign = {} as ICampaignData;
  impData = {} as ICampaignParamCnt;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    public override messagesService: MessagesService,
    private dialog: MatDialog,
    public override tokenStorage: TokenStorageService
  ) {
    super(tokenStorage,messagesService);
    this.customerId = tokenStorage.getUser().userid;
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
  }

  import(campaignId: number, param_count: number, campaignType: number) {
    this.impData.campaignid = campaignId;
    this.impData.param_count = param_count;
    this.impData.campaign_type = campaignType;
    const dialogRef = this.dialog.open(VcCampaignImportComponent, {
      width: '800px',
      height: '500px',
      data: this.impData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.messagesService.create(result);
      }
    });
  }

  ngAfterViewInit() {
    console.log('afterViewInit:paginator:' + this.paginator);
  }
  ngOnInit(): void {
    console.log('vc-campaign:location:' + window.location.href);
    if (this.checkToken('vc-campaign') == false) {
      return;
    }
    this.readVCCampaign();
  }
  readVCCampaign(): void {
    this.messagesService.readVCCampaign(this.customerId).subscribe(
      (campaign) => {
        console.log(campaign);
        this.campaign.wa_campaign = campaign;
        if (campaign.error_code == 1100) {
          this.redirectLogin('campaign-report');
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else if (campaign.error_code == 0) {
          this.campaign = campaign;
          this.dataSource = new MatTableDataSource(this.campaign.wa_campaign);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.campaign = campaign;
          this.dataSource = new MatTableDataSource(this.campaign.wa_campaign);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        this.isError = true;
        console.log(error);
        if (error.status == 0) {
          this.error_message = 'net work error:';
        } else if (error.error_code == 1100) {
          this.error_message = 'net work error:';
        } else {
          this.error_message = 'net work error:' + error.message;
        }
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.readCampaign();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log('afterFilter:firstpage');
    }
    console.log('afterFilter');
  }
}

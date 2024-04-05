import { Inject, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignSummaryMonthDay } from '../../../material/ICampaignData';
import { ICampaignData } from '../../../material/dynamic-table.module';
import { CampaignService } from '../../../_service/campaign.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { VGCommonModule } from '../../CommonModule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportToCsv } from 'export-to-csv';
import { MessagesService } from 'src/app/_service/messages.service';


@Component({
  selector: 'app-vc-campaign-summary-month-day',
  templateUrl: './vc-campaign-summary-month-day.component.html',
  styleUrls: ['./vc-campaign-summary-month-day.component.scss'],
})
export class VcCampaignSummaryMonthDayComponent
  extends VGCommonModule
  implements OnInit
{
  displayedColumns: string[] = [
    'campaign_id',
    //'customer_id',
    'date',
    'call_count',
    'pluse_count',
    'export',
    'success_count',
    'failed_count',
  ];

  dataSource: MatTableDataSource<CampaignSummaryMonthDay>;
  override error_message: string = '';
  override isError: boolean = false;
  customerId: string = '';
  year_month:string='';
  campaignId:string='';
  campaign = {} as ICampaignData;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog,
    public override tokenStorage: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VcCampaignSummaryMonthDayComponent>,
    public override messagesService:MessagesService
  ) {
    super(tokenStorage,messagesService);
    this.customerId = tokenStorage.getUser().userid;
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    this.campaignId=data.campaign_id;
    this.year_month=data.year_month;
    console.log(data);
    console.log(this.campaignId);
    console.log(this.year_month);
  }
  export(campaign: string, year_month: string) {
    if(this.getReportDataMonth(campaign, year_month)==false ){
      return
    }
  }
  
  getReportDataMonth(campaignid: string, year_month: string):boolean{    
    this.isError = false;
    this.campaignService.readVCCampaignDataReport(campaignid, year_month).subscribe(
      (campaign) => {
        console.log(campaign);
        this.campaign.campaignDataReport = campaign;
        if (campaign.error_code == 1100) {
          this.redirectLogin('campaign-report');
          this.error_message = 'not authorized:session expired, please login';
          return false;
        } else if (campaign.error_code == 0) {
          this.campaign.campaignDataReport = campaign;        
        return false;
        } else {
          this.campaign.campaignDataReport = campaign;   
          const options = { 
            filename: campaignid+"_"+year_month,
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Call Report Campaign '+campaignid+' Month '+year_month,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
         
          const csvExporter = new ExportToCsv(options);         
          csvExporter.generateCsv(this.campaign.campaignDataReport);       
          return true;
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
        this.isError=true;
      }   
    );
    return false;
  }
  readVCCampaignSummeryMonthDay(): void {
    this.campaignService.readVCCampaignSummaryMonthDay(this.campaignId,this.year_month).subscribe(
      (campaign) => {
        console.log(campaign);
        this.campaign.campaignSummaryMonthDay = campaign;
        if (campaign.error_code == 1100) {
          this.redirectLogin('campaign-report');
          this.error_message = 'not authorized:session expired, please login';
          return;
        } else if (campaign.error_code == 0) {
          this.campaign.campaignSummaryMonthDay = campaign;
          this.dataSource = new MatTableDataSource(
            this.campaign.campaignSummaryMonthDay
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.campaign.campaignSummaryMonthDay = campaign;
          this.dataSource = new MatTableDataSource(
            this.campaign.campaignSummaryMonthDay
          );
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
  ngOnInit(): void {
    console.log('vc-campaign-summary-month-day:location:' + window.location.href);
    if (this.checkToken('vc-campaign') == false) {
      return;
    }
    this.readVCCampaignSummeryMonthDay();
  }

}

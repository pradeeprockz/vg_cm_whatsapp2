import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsgSumReportComponent } from './msg-sum/msg-sum-report.component';
import {WaCampaignScheduleDataSummReportComponent} from './wa-campaign-schedule-data-summ/wa-campaign-schedule-data-summ-report.component';
import { WaCampaignDataSummReportComponent } from './wa-campaign-data-summ/wa-campaign-data-summ-report.component';
import {MsgOutSummaryReportComponent} from './msg-out-summary/msg-out-summary-report.component';
import { InMsgSummReportComponent } from './in-msg-summ/in-msg-summ-report.component';
import { OutStatusSummReportComponent } from './out-status-summ/out-status-summ-report.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Msg Sum Report',
    },
    children: [
      {
        path: '',
        redirectTo: 'msg-sum-report',
        pathMatch: 'full'
      },
      {
        path: 'msg-sum-report',
        component: MsgSumReportComponent,
        data: {
          title: 'Msg Sum Report',
        },
        
      },
      {
        path: 'wa-campaign-schedule-data-summ-report',
        component: WaCampaignScheduleDataSummReportComponent,
        data: {
          title: 'Wa Camoaign Schedule Data Summ Report',
        },
        
      },
      {
        path: 'wa-campaign-data-summ-report',
        component: WaCampaignDataSummReportComponent,
        data: {
          title: 'Wa Campaign Data Summ Report',
        },
        
      },
      {
        path: 'msg-out-summary-report',
        component: MsgOutSummaryReportComponent,
        data: {
          title: 'Msg Out Summ Report',
        },
        
      },
      {
        path: 'in-msg-summ-report',
        component: InMsgSummReportComponent,
        data: {
          title: 'In Msg Summ Report',
        },
        
      },
      {
        path: 'out-status-summ-report',
        component: OutStatusSummReportComponent
        ,
        data: {
          title: 'Out Status Summ Report',
        },
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

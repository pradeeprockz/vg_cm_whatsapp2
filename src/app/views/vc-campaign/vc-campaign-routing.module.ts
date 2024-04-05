import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VcCampaignSummaryMonthComponent } from './vc-campaign-summary-month/vc-campaign-summary-month.component';
import {VcCampaignComponent} from './vc-campaign-report/vc-campaign.component'


const routes: Routes = [
  {
    path: '',
    component: VcCampaignComponent,
    data: {
      title: 'Campaign',
    },
  },
  {
    path: 'vc-campaign-summary-month',
    component: VcCampaignSummaryMonthComponent,
    data: {
      title: 'Campaign-summary',
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcCampaignRoutingModule { }

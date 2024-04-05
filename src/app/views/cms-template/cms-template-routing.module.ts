import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsTemplateReportComponent } from './cms-template-report/cms-template-report.component';
import { CmsComponentsReportComponent } from '../cms-components/cms-components-report/cms-components-report.component';
import { CmsTempWaCompParamsReportComponent } from '../cms-temp-wa-comp-params/cms-temp-wa-comp-params-report/cms-temp-wa-comp-params-report.component';
import { CmsTempWaCompHeaderParamsReportComponent } from '../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-report/cms-temp-wa-comp-header-params-report.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CMS Template Report',
    },
    children: [
      {
        path: '',
        redirectTo: 'cms-template-report',
        pathMatch: 'full'
      },
      {
        path: 'cms-template-report',
        component: CmsTemplateReportComponent,
        data: {
          title: 'CMS Template Report',
        },
      },
      {
        path: 'cms-components-report',
        component: CmsComponentsReportComponent,
        data: {
          title: 'CMS Components Report',
        },
      },
      {
        path: 'cms-temp-wa-comp-params-report',
        component: CmsTempWaCompParamsReportComponent,
        data: {
          title: 'CMS Temp Wa Comp Params Report',
        },
      },
      {
        path: 'cms-temp-wa-comp-header-params-report',
        component: CmsTempWaCompHeaderParamsReportComponent,
        data: {
          title: 'CMS Temp Wa Comp Header Params Report',
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsTemplateRoutingModule { }

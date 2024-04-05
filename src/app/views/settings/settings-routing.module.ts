import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WaBlockReportComponent} from './wa-block/wa-block-report/wa-block-report.component';
import { GreetflowReportComponent } from './greetflow/greetflow-report/greetflow-report.component';
import { GreetflowLevelNameComponent } from './greetflow-level-name/greetflow-level-name.component';
import {PivotTableComponent} from './pivot-table/pivot-table.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wa Block Report',
    },
    children: [
      {
        path: '',
        redirectTo: 'wa-block-report',
        pathMatch: 'full'
      },
      {
        path: 'wa-block-report',
        component: WaBlockReportComponent,
        data: {
          title: 'Wa Block Report',
        },
        
      },
      {
        path: 'greetflow-report',
        component: GreetflowReportComponent,
        data: {
          title: 'GreetFlow Report',
        },
        
      },
      {
        path: 'greetflow-level-name',
        component: GreetflowLevelNameComponent,
        data: {
          title: 'GreetFlow Level Name',
        },
        
      },
      {
        path: 'pivot-table',
        component: PivotTableComponent,
        data: {
          title: 'Pivot Table',
        },
      },

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

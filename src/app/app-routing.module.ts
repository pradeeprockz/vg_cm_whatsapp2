import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path:'cms-template',
        loadChildren: () =>
          import(
            './views/cms-template/cms-template.module'
          ).then((m) => m.CmsTemplateModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import(
            './views/reports/reports.module'
          ).then((m) => m.ReportsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import(
            './views/settings/settings.module'
          ).then((m) => m.SettingsModule),
      },
      {
        path: 'vc-campaign',
        loadChildren: () =>
          import('./views/vc-campaign/vc-campaign.module').then(
            (m) => m.VcCampaignModule
          ),
      }, 
     
      
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  
  
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

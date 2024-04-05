import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsTemplateRoutingModule } from './cms-template-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
//import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ModalModule } from '@coreui/angular';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AlertModule } from '@coreui/angular';
import { CmsTemplateReportComponent } from './cms-template-report/cms-template-report.component';
import { CmsTemplateCreateComponent } from './cms-template-create/cms-template-create.component';
import { CmsTemplateUpdateComponent } from './cms-template-update/cms-template-update.component';
import { CmsTemplateDeleteComponent } from './cms-template-delete/cms-template-delete.component';
import { CmsComponentsReportComponent } from '../cms-components/cms-components-report/cms-components-report.component';
import { CmsComponentsCreateComponent } from '../cms-components/cms-components-create/cms-components-create.component';
import { CmsComponentsUpdateComponent } from '../cms-components/cms-components-update/cms-components-update.component';
import { CmsComponentsDeleteComponent } from '../cms-components/cms-components-delete/cms-components-delete.component';
import { CmsTempWaCompParamsReportComponent } from '../cms-temp-wa-comp-params/cms-temp-wa-comp-params-report/cms-temp-wa-comp-params-report.component';
import { CmsTempWaCompParamsCreateComponent } from '../cms-temp-wa-comp-params/cms-temp-wa-comp-params-create/cms-temp-wa-comp-params-create.component';
import { CmsTempWaCompParamsUpdateComponent } from '../cms-temp-wa-comp-params/cms-temp-wa-comp-params-update/cms-temp-wa-comp-params-update.component';
import { CmsTempWaCompParamsDeleteComponent } from '../cms-temp-wa-comp-params/cms-temp-wa-comp-params-delete/cms-temp-wa-comp-params-delete.component';
import { CmsTempWaCompHeaderParamsReportComponent } from '../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-report/cms-temp-wa-comp-header-params-report.component';
import { CmsTempWaCompHeaderParamsCreateComponent } from '../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-create/cms-temp-wa-comp-header-params-create.component';
import { CmsTempWaCompHeaderParamsUpdateComponent } from '../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-update/cms-temp-wa-comp-header-params-update.component';
import { CmsTempWaCompHeaderParamsDeleteComponent } from '../cms-temp-wa-comp-header-params/cms-temp-wa-comp-header-params-delete/cms-temp-wa-comp-header-params-delete.component';



@NgModule({
  declarations: [
    CmsTemplateReportComponent,
    CmsTemplateCreateComponent,
    CmsTemplateUpdateComponent,
    CmsTemplateDeleteComponent,
    CmsComponentsReportComponent,
    CmsComponentsCreateComponent,
    CmsComponentsUpdateComponent,
    CmsComponentsDeleteComponent,
    CmsTempWaCompParamsReportComponent,
    CmsTempWaCompParamsCreateComponent,
    CmsTempWaCompParamsUpdateComponent,
    CmsTempWaCompParamsDeleteComponent,
    CmsTempWaCompHeaderParamsReportComponent,
    CmsTempWaCompHeaderParamsCreateComponent,
    CmsTempWaCompHeaderParamsUpdateComponent,
    CmsTempWaCompHeaderParamsDeleteComponent,
  ],
  imports: [
    CommonModule,
    CmsTemplateRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    FormModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    NavModule,
    ButtonModule,
    UtilitiesModule,
    ButtonGroupModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    CardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    TextFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSortModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatDatepickerModule,
   // DateTimePickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ModalModule,
    AlertModule,

  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: []
    }
  ]
})
export class CmsTemplateModule { }


import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ReportsRoutingModule } from './reports-routing.module';
import {MsgSumReportComponent} from './msg-sum/msg-sum-report.component'
import { WaCampaignScheduleDataSummReportComponent } from './wa-campaign-schedule-data-summ/wa-campaign-schedule-data-summ-report.component';
import {WaCampaignDataSummReportComponent} from './wa-campaign-data-summ/wa-campaign-data-summ-report.component';
import { MsgOutSummaryReportComponent } from './msg-out-summary/msg-out-summary-report.component';
import {InMsgSummReportComponent} from './in-msg-summ/in-msg-summ-report.component'
import {OutStatusSummReportComponent} from './out-status-summ/out-status-summ-report.component';


@NgModule({
  declarations: [
    MsgSumReportComponent,
    WaCampaignScheduleDataSummReportComponent,
    WaCampaignDataSummReportComponent,
    MsgOutSummaryReportComponent,
    InMsgSummReportComponent,
    OutStatusSummReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
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
    MatCheckboxModule,
    MatNativeDateModule,
    ModalModule,
    AlertModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[
    {
      provide:MatDialogRef,
      useValue: []
    }
  ]
})
export class ReportsModule { }

import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerModule } from '@coreui/angular';
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
  ModalModule
} from '@coreui/angular';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { VcCampaignRoutingModule } from './vc-campaign-routing.module';
import { VcCampaignSummaryMonthDayComponent } from './vc-campaign-summary-month-day/vc-campaign-summary-month-day.component';
import { VcCampaignImportComponent } from './vc-campaign-import/vc-campaign-import.component';
import { VcCampaignSummaryMonthComponent } from './vc-campaign-summary-month/vc-campaign-summary-month.component';
import { VcCampaignComponent } from './vc-campaign-report/vc-campaign.component';


@NgModule({
  declarations: [
    VcCampaignComponent,
    VcCampaignSummaryMonthDayComponent,
    VcCampaignSummaryMonthComponent,
    VcCampaignImportComponent,
    
  ],
  imports: [
    CommonModule,
    VcCampaignRoutingModule,
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
    ButtonModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
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
    MatRadioModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ModalModule,
    SpinnerModule,
    MatProgressSpinnerModule

  ]
})
export class VcCampaignModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AlertModule } from '@coreui/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsRoutingModule } from './settings-routing.module';
import { WaBlockReportComponent } from './wa-block/wa-block-report/wa-block-report.component';
import { WaBlockCreateComponent } from './wa-block/wa-block-create/wa-block-create.component';
import { WaBlockDeleteComponent } from './wa-block/wa-block-delete/wa-block-delete.component';
import { WaBlockUpdateComponent } from './wa-block/wa-block-update/wa-block-update.component';
import {GreetflowReportComponent} from './greetflow/greetflow-report/greetflow-report.component';
import {GreetflowCreateComponent} from './greetflow/greetflow-create/greetflow-create.component';
import {GreetflowUpdateComponent} from './greetflow/greetflow-update/greetflow-update.component';
import {GreetflowDeleteComponent} from './greetflow/greetflow-delete/greetflow-delete.component';
import {GreetflowLevelNameComponent} from './greetflow-level-name/greetflow-level-name.component';
import { PivotTableComponent } from './pivot-table/pivot-table.component';

@NgModule({
  declarations: [
    WaBlockReportComponent,
    WaBlockCreateComponent,
    WaBlockUpdateComponent,
    WaBlockDeleteComponent,
    GreetflowReportComponent,
    GreetflowCreateComponent,
    GreetflowUpdateComponent,
    GreetflowDeleteComponent,
    GreetflowLevelNameComponent,
    PivotTableComponent

  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
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
  providers: [
    {
      provide: MatDialogRef,
      useValue: []
    }
  ]
})
export class SettingsModule { }

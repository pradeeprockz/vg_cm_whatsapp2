import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common'; 
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  BreadcrumbModule,
  DropdownModule,
  FooterModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule,
} from '@coreui/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//import { PivotTableComponent } from './pivot-table/pivot-table.component';
//import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  //PivotTableComponent

];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    IconSetModule,
    //PerfectScrollbarModule,
    NavModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    GridModule,
    HttpClientModule,
  //  CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule,
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DatePipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

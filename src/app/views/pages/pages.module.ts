import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  AlertModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule } from '@angular/material/select';
import { UserDetailsCreateComponent } from './user-details/user-details-create.component';

@NgModule({
  declarations: [LoginComponent,
    UserDetailsCreateComponent
    ],
  imports: [
    CommonModule,
    MatInputModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    MatFormFieldModule,
    MatSelectModule,
  ],exports: [    
    MatFormFieldModule,
    MatInputModule,    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}

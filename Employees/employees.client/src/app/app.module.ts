import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { UpdateEmployeeDetailsComponent } from './update-employee-details/update-employee-details.component';
import { DeleteEmployeeDetailsComponent } from './delete-employee-details/delete-employee-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { authGuard } from './auth.guard';





const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'EmployeeDetails', component: EmployeeDetailsComponent, canActivate: [authGuard] },
  { path: 'AddEmployee', component: AddEmployeeComponent },
  { path: 'UpdateEmployee/:id', component: UpdateEmployeeDetailsComponent,canActivate:[authGuard] },
  { path: 'DeleteEmployee/:id', component: DeleteEmployeeDetailsComponent,canActivate:[authGuard] },
  { path: 'Login', component: LoginComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    UpdateEmployeeDetailsComponent,
    DeleteEmployeeDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule,
    AppRoutingModule, RouterModule.forRoot(appRoutes), MatToolbarModule, MatIconModule, MatFormFieldModule, 
    MatInputModule,     
    MatButtonModule,    
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

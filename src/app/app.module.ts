import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './home/form/form.component';
import { FormBuilderComponent } from './home/form/form-builder/form-builder.component';
import { FormModalComponent } from './home/form/form-builder/form-modal/form-modal.component';
import { InputTextComponent } from './home/form/form-builder/input-text/input-text.component';
import { ProjectService } from './service/ProjectService';
import { APIService } from './service/APIService';
import { InputPasswordComponent } from './home/form/form-builder/input-password/input-password.component';
import { InputEmailComponent } from './home/form/form-builder/input-email/input-email.component';
import { InputNumberComponent } from './home/form/form-builder/input-number/input-number.component';
import { InputTextareaComponent } from './home/form/form-builder/input-textarea/input-textarea.component';
import { InputDateComponent } from './home/form/form-builder/input-date/input-date.component';
import { InputPhoneComponent } from './home/form/form-builder/input-phone/input-phone.component';
import { InputTimeComponent } from './home/form/form-builder/input-time/input-time.component';
import { InputRadioComponent } from './home/form/form-builder/input-radio/input-radio.component';
import { InputCheckboxComponent } from './home/form/form-builder/input-checkbox/input-checkbox.component';
import { InputDropdownComponent } from './home/form/form-builder/input-dropdown/input-dropdown.component';
import { InputSliderComponent } from './home/form/form-builder/input-slider/input-slider.component';
import { InputFileComponent } from './home/form/form-builder/input-file/input-file.component';
import { InputBreakComponent } from './home/form/form-builder/input-break/input-break.component';

import { routes } from './app.routes';
import { TemplateTabContentComponent } from './home/form/form-builder/template-tab-content/template-tab-content.component';
import { AssessorComponent } from './home/organisation/assessor/assessor.component';
import { UserComponent } from './home/organisation/user/user.component';
import { ProjectComponent } from './home/project/project.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { OrganisationComponent } from './home/organisation/organisation.component';
import { ResponseComponent } from './home/response/response.component';
import { ResponseTableComponent } from './home/response/response-table/response-table.component';
import { CustomOption } from './home/dashboard/ng2-toastr-custom-option';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormComponent,
    FormBuilderComponent,
    FormModalComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputEmailComponent,
    InputNumberComponent,
    InputTextareaComponent,
    InputDateComponent,
    InputPhoneComponent,
    InputTimeComponent,
    InputRadioComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    InputSliderComponent,
    InputFileComponent,
    InputBreakComponent,
    TemplateTabContentComponent,
    AssessorComponent,
    UserComponent,
    ProjectComponent,
    DashboardComponent,
    OrganisationComponent,
    ResponseComponent,
    ResponseTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    ProjectService,
    APIService,
    {provide: ToastOptions, useClass: CustomOption},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

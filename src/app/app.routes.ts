import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './home/form/form.component';
import { FormBuilderComponent } from './home/form/form-builder/form-builder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'forms', component:  FormComponent},
  { path: 'formBuilder', component:  FormBuilderComponent},

];

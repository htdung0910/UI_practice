import { Routes } from '@angular/router';
import { ConfigSettingsComponent } from './config-settings/config-settings.component';
import { AddEditSettingComponent } from './add-edit-setting/add-edit-setting.component';

export const routes: Routes = [
    { path: 'config-settings', component: ConfigSettingsComponent },
    { path: 'add-edit-setting', component: AddEditSettingComponent },
    { path: '', redirectTo: '/config-settings', pathMatch: 'full' }
  ];
  

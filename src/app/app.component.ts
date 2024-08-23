import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConfigSettingsComponent } from "./config-settings/config-settings.component";
import { AddSettingComponent } from "./add-setting/add-setting.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ConfigSettingsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'configuration-management';
}

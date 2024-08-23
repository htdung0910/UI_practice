import { ConfigSettingsService } from './../config-settings.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigSetting } from '../config-settings.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmationComponent,
    PopupComponent
]
})
export class EditSettingComponent implements OnInit {
  @Input() data!: ConfigSetting;
  @Output() close = new EventEmitter<void>();

  settingForm!: FormGroup;
  showConfirmation: boolean = false;

  constructor(private fb: FormBuilder, private configSettingsService: ConfigSettingsService) {}

  ngOnInit(): void {
    this.settingForm = this.fb.group({
      key: [{ value: this.data.key, disabled: true }],
      value: [this.data.value, [Validators.required, Validators.maxLength(255)]],
      appName: [this.data.appName, [Validators.required, Validators.maxLength(100)]],
      version: [this.data.version, [Validators.required, Validators.pattern(/^\d+(\.\d+)*$/)]],
      modifiedOn: [{ value: this.data.modifiedOn, disabled: true }],
      modifiedBy: [{ value: this.data.modifiedBy, disabled: true }],
    });
  }

  onUpdate(): void {
    if (this.settingForm.valid) {
      this.showConfirmation = true; 
    }
  }

  handleConfirmation(result: boolean): void {
    this.showConfirmation = false; 

    if (result) {
      
      const updatedValues: ConfigSetting = {
        ...this.data,
        ...this.settingForm.getRawValue(),
        modifiedOn: new Date(),
        modifiedBy: 'Sc.Configuration.UI' 
      };

      this.configSettingsService.editSetting(updatedValues);
      this.onCancel();
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

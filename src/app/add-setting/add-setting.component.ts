import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigSettingsService } from '../config-settings.service';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './../popup/popup.component';
import { ConfirmationComponent } from "../confirmation/confirmation.component";

@Component({
  selector: 'app-add-setting',
  standalone: true,
  imports: [
    CommonModule,
    PopupComponent,
    ReactiveFormsModule,
    ConfirmationComponent
],
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.scss']
})
export class AddSettingComponent {
  settingForm!: FormGroup;
  showDialog: boolean = false;   
  confirmationMessage: string = 'Are you sure you want to add this setting?';

  @Output() close = new EventEmitter<void>();  

  constructor(
    private fb: FormBuilder,
    private configSettingsService: ConfigSettingsService,
  ) {
    this.settingForm = this.fb.group({
      key: ['', [Validators.required, Validators.maxLength(50)]],
      value: ['', [Validators.maxLength(255)]],
      appName: ['', [Validators.required, Validators.maxLength(100)]],
      version: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)*$/)]],
    });
  }

  onSave(): void {
    if (this.settingForm.valid) {
      const formValues = this.settingForm.value;

      this.configSettingsService.checkDuplicate(
        formValues.key,
        formValues.version
      ).subscribe(isDuplicate => {
        if (isDuplicate) {
          alert('The same key name with the same version number already exists.');
        } else {
          this.showDialog = true;  
        }
      });
    }
  }

  handleDialogResult(result: boolean): void {
    this.showDialog = false; 

    if (result) {
      const formValues = this.settingForm.value;
      this.configSettingsService.addSetting(formValues);
      alert('Configuration Setting added successfully!');
      this.close.emit();  
    }
  }

  onCancel(): void {
    this.close.emit();  
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigSetting, ConfigSettingsService } from '../config-settings.service';
import { AddSettingComponent } from '../add-setting/add-setting.component';
import { EditSettingComponent } from '../edit-setting/edit-setting.component';
import { PopupComponent } from '../popup/popup.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddSettingComponent,
    EditSettingComponent,
    PopupComponent,
    ConfirmationComponent,
    NgbTooltip,
    FormsModule
  ],
  templateUrl: './config-settings.component.html',
  styleUrls: ['./config-settings.component.scss'],
})
export class ConfigSettingsComponent implements OnInit {
  searchForm!: FormGroup;
  settings: ConfigSetting[] = [];
  filteredSettings: ConfigSetting[] = [];
  paginatedSettings: ConfigSetting[] = [];
  sortState = { column: '', direction: 'normal' as 'asc' | 'desc' | 'normal' };

  selectedSetting?: ConfigSetting;
  showAddPopup = false;
  showEditPopup = false;
  showDeletePopup = false;

  currentPage : number  = 1;
  pageSize : number = 5;
  totalPages : number  = 1;
  entriesOptions: number[] = [5, 10, 25, 50, 100];

  private filterMapping: { [key: string]: keyof ConfigSetting } = {
    keyName: 'key',
    appName: 'appName',
    filterKeyName: 'key',
    filterValue: 'value',
    filterAppName: 'appName',
    filterVersion: 'version',
    filterModifiedOn: 'modifiedOn',
  };

  constructor(
    private configSettingsService: ConfigSettingsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchSettings();
  }

  private initializeForm() {
    this.searchForm = this.fb.group({
      keyName: ['', [Validators.minLength(2)]],
      appName: ['', [Validators.minLength(2)]],
      filterKeyName: [''],
      filterValue: [''],
      filterAppName: [''],
      filterVersion: [''],
      filterModifiedOn: [''],
    });
  }

  private fetchSettings() {
    this.configSettingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.filteredSettings = [...this.settings];
      this.calculatePagination();
    });
  }

  private calculatePagination() {
    this.totalPages = Math.ceil(this.filteredSettings.length / this.pageSize);
    this.paginateData();
  }

  private paginateData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedSettings = this.filteredSettings.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateData();
    }
  }

  generatePageNumbers(): number[] {
    const pages: number[] = [];
    const totalPagesToShow = 5;

    if (this.totalPages <= totalPagesToShow) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    const startPage = Math.max(2, this.currentPage - Math.floor(totalPagesToShow / 2));
    let endPage = startPage + totalPagesToShow - 2;

    if (endPage >= this.totalPages) {
      endPage = this.totalPages - 1;
    }

    if (startPage > 2) pages.push(-1);
    pages.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
    if (endPage < this.totalPages - 1) pages.push(-1);
    pages.push(this.totalPages);

    return pages;
  }

  sortData(column: string) {
    const { direction } = this.sortState;
    this.sortState = {
      column,
      direction: direction === 'asc' ? 'desc' : direction === 'desc' ? 'normal' : 'asc',
    };

    this.filteredSettings = this.sortState.direction === 'normal' ? [...this.settings] : this.filteredSettings.sort((a, b) => this.compare(a, b, column));
    this.calculatePagination();
  }

  private compare(a: ConfigSetting, b: ConfigSetting, column: string) {
    const directionMultiplier = this.sortState.direction === 'asc' ? 1 : -1;
    const valueA = this.getValue(a[column as keyof ConfigSetting]);
    const valueB = this.getValue(b[column as keyof ConfigSetting]);

    return valueA < valueB ? -1 * directionMultiplier : valueA > valueB ? 1 * directionMultiplier : 0;
  }

  private getValue(value: any): string | number {
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'string') return value.toLowerCase();
    if (typeof value === 'number') return value;
    return '';
  }

  applyFilter() {
    this.filteredSettings = this.settings.filter((setting) => this.matchesFilters(setting));
    this.resetSorting();
    this.calculatePagination();
  }

  private matchesFilters(setting: ConfigSetting): boolean {
    return Object.keys(this.searchForm.value).every((filterKey) => {
      const filterValue = this.searchForm.value[filterKey];
      if (!filterValue) return true;

      const settingValue = setting[this.filterMapping[filterKey]];
      return this.filterMatch(settingValue, filterValue);
    });
  }

  private filterMatch(settingValue: any, filterValue: string): boolean {
    if (typeof settingValue === 'string') return settingValue.toLowerCase().includes(filterValue.toLowerCase());
    if (settingValue instanceof Date) return new Date(settingValue).toLocaleDateString('en-US').includes(filterValue);
    if (typeof settingValue === 'number') return settingValue.toString() === filterValue;
    return false;
  }

  private resetSorting() {
    this.sortState = { column: '', direction: 'normal' };
  }

  addSetting() {
    this.showAddPopup = true;
  }

  handleAddClose() {
    this.showAddPopup = false;
  }

  editSetting(setting: ConfigSetting) {
    this.selectedSetting = setting;
    this.showEditPopup = true;
  }

  handleEditClose() {
    this.showEditPopup = false;
  }

  confirmDelete(setting: ConfigSetting) {
    this.selectedSetting = setting;
    this.showDeletePopup = true;
  }

  handleDelete(confirm: boolean) {
    if (confirm && this.selectedSetting) {
      this.configSettingsService.deleteSetting(this.selectedSetting.id);
    }
    this.showDeletePopup = false;
  }

  toggleTooltip(tooltip: NgbTooltip, column: string) {
    tooltip.isOpen() ? tooltip.close() : this.openTooltip(tooltip, column);
  }

  private openTooltip(tooltip: NgbTooltip, column: string) {
    this.closeAllTooltips();
    tooltip.open();
    this.focusInput(column);
  }

  private closeAllTooltips() {
    document.querySelectorAll('.ngb-tooltip').forEach((tooltip) => (tooltip as any).tooltip.close());
  }

  private focusInput(column: string) {
    const inputSelector = this.getInputSelector(column);
    if (inputSelector) {
      setTimeout(() => (document.querySelector(inputSelector) as HTMLInputElement)?.focus(), 0);
    }
  }

  private getInputSelector(column: string): string | null {
    switch (column) {
      case 'key': return 'input[formControlName="filterKeyName"]';
      case 'value': return 'input[formControlName="filterValue"]';
      case 'appName': return 'input[formControlName="filterAppName"]';
      case 'version': return 'input[formControlName="filterVersion"]';
      case 'modifiedOn': return 'input[formControlName="filterModifiedOn"]';
      default: return null;
    }
  }

  getSortIcon(column: string): string {
    if (this.sortState.column !== column || this.sortState.direction == 'normal') return 'bi bi-arrows-expand';
    return this.sortState.direction === 'asc' ? 'bi bi-sort-down' : 'bi bi-sort-down-alt';
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.applyFilter();
  }
}

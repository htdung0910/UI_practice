import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
export interface ConfigSetting {
  id: number;
  key: string;
  appName: string;
  version?: string;
  value: string;
  modifiedOn: Date;
  modifiedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigSettingsService {
  private settingsSubject: BehaviorSubject<ConfigSetting[]> = new BehaviorSubject<ConfigSetting[]>([]);
  private currentId = 1;

  constructor() {
    const initialSettings: ConfigSetting[] = [
      { id: this.currentId++, key: 'setting1', appName: 'App1', version: '1.0', value: 'Value1', modifiedOn: new Date('2023-12-19') },
      { id: this.currentId++, key: 'setting2', appName: 'App2', version: '1.0', value: 'Value2', modifiedOn: new Date('2023-12-20') },
      { id: this.currentId++, key: 'setting3', appName: 'App3', version: '1.1', value: 'Value3', modifiedOn: new Date('2023-12-21') },
      { id: this.currentId++, key: 'setting4', appName: 'App4', version: '1.1', value: 'Value4', modifiedOn: new Date('2023-12-22') },
      { id: this.currentId++, key: 'setting5', appName: 'App5', version: '2.0', value: 'Value5', modifiedOn: new Date('2023-12-23') },
      { id: this.currentId++, key: 'setting6', appName: 'App1', version: '2.0', value: 'Value6', modifiedOn: new Date('2023-12-24') },
      { id: this.currentId++, key: 'setting7', appName: 'App2', version: '2.1', value: 'Value7', modifiedOn: new Date('2023-12-25') },
      { id: this.currentId++, key: 'setting8', appName: 'App3', version: '2.1', value: 'Value8', modifiedOn: new Date('2023-12-26') },
      { id: this.currentId++, key: 'setting9', appName: 'App4', version: '3.0', value: 'Value9', modifiedOn: new Date('2023-12-27') },
      { id: this.currentId++, key: 'setting10', appName: 'App5', version: '3.0', value: 'Value10', modifiedOn: new Date('2023-12-28') },
      { id: this.currentId++, key: 'setting11', appName: 'App1', version: '1.0', value: 'Value11', modifiedOn: new Date('2023-12-29') },
      { id: this.currentId++, key: 'setting12', appName: 'App2', version: '1.0', value: 'Value12', modifiedOn: new Date('2023-12-30') },
      { id: this.currentId++, key: 'setting13', appName: 'App3', version: '1.1', value: 'Value13', modifiedOn: new Date('2023-12-31') },
      { id: this.currentId++, key: 'setting14', appName: 'App4', version: '1.1', value: 'Value14', modifiedOn: new Date('2024-01-01') },
      { id: this.currentId++, key: 'setting15', appName: 'App5', version: '2.0', value: 'Value15', modifiedOn: new Date('2024-01-02') },
      { id: this.currentId++, key: 'setting16', appName: 'App1', version: '2.0', value: 'Value16', modifiedOn: new Date('2024-01-03') },
      { id: this.currentId++, key: 'setting17', appName: 'App2', version: '2.1', value: 'Value17', modifiedOn: new Date('2024-01-04') },
      { id: this.currentId++, key: 'setting18', appName: 'App3', version: '2.1', value: 'Value18', modifiedOn: new Date('2024-01-05') },
      { id: this.currentId++, key: 'setting19', appName: 'App4', version: '3.0', value: 'Value19', modifiedOn: new Date('2024-01-06') },
      { id: this.currentId++, key: 'setting20', appName: 'App5', version: '3.0', value: 'Value20', modifiedOn: new Date('2024-01-07') },
      { id: this.currentId++, key: 'setting21', appName: 'App1', version: '1.0', value: 'Value21', modifiedOn: new Date('2024-01-08') },
      { id: this.currentId++, key: 'setting22', appName: 'App2', version: '1.0', value: 'Value22', modifiedOn: new Date('2024-01-09') },
      { id: this.currentId++, key: 'setting23', appName: 'App3', version: '1.1', value: 'Value23', modifiedOn: new Date('2024-01-10') },
      { id: this.currentId++, key: 'setting24', appName: 'App4', version: '1.1', value: 'Value24', modifiedOn: new Date('2024-01-11') },
      { id: this.currentId++, key: 'setting25', appName: 'App5', version: '2.0', value: 'Value25', modifiedOn: new Date('2024-01-12') },
      { id: this.currentId++, key: 'setting26', appName: 'App1', version: '2.0', value: 'Value26', modifiedOn: new Date('2024-01-13') },
      { id: this.currentId++, key: 'setting27', appName: 'App2', version: '2.1', value: 'Value27', modifiedOn: new Date('2024-01-14') },
      { id: this.currentId++, key: 'setting28', appName: 'App3', version: '2.1', value: 'Value28', modifiedOn: new Date('2024-01-15') },
      { id: this.currentId++, key: 'setting29', appName: 'App4', version: '3.0', value: 'Value29', modifiedOn: new Date('2024-01-16') },
      { id: this.currentId++, key: 'setting30', appName: 'App5', version: '3.0', value: 'Value30', modifiedOn: new Date('2024-01-17') },
      { id: this.currentId++, key: 'setting31', appName: 'App1', version: '1.0', value: 'Value31', modifiedOn: new Date('2024-01-18') },
      { id: this.currentId++, key: 'setting32', appName: 'App2', version: '1.0', value: 'Value32', modifiedOn: new Date('2024-01-19') },
      { id: this.currentId++, key: 'setting33', appName: 'App3', version: '1.1', value: 'Value33', modifiedOn: new Date('2024-01-20') },
      { id: this.currentId++, key: 'setting34', appName: 'App4', version: '1.1', value: 'Value34', modifiedOn: new Date('2024-01-21') },
      { id: this.currentId++, key: 'setting35', appName: 'App5', version: '2.0', value: 'Value35', modifiedOn: new Date('2024-01-22') },
      { id: this.currentId++, key: 'setting36', appName: 'App1', version: '2.0', value: 'Value36', modifiedOn: new Date('2024-01-23') },
      { id: this.currentId++, key: 'setting37', appName: 'App2', version: '2.1', value: 'Value37', modifiedOn: new Date('2024-01-24') },
      { id: this.currentId++, key: 'setting38', appName: 'App3', version: '2.1', value: 'Value38', modifiedOn: new Date('2024-01-25') },
      { id: this.currentId++, key: 'setting39', appName: 'App4', version: '3.0', value: 'Value39', modifiedOn: new Date('2024-01-26') },
      { id: this.currentId++, key: 'setting40', appName: 'App5', version: '3.0', value: 'Value40', modifiedOn: new Date('2024-01-27') },
      { id: this.currentId++, key: 'setting41', appName: 'App1', version: '1.0', value: 'Value41', modifiedOn: new Date('2024-01-28') },
      { id: this.currentId++, key: 'setting42', appName: 'App2', version: '1.0', value: 'Value42', modifiedOn: new Date('2024-01-29') },
      { id: this.currentId++, key: 'setting43', appName: 'App3', version: '1.1', value: 'Value43', modifiedOn: new Date('2024-01-30') },
      { id: this.currentId++, key: 'setting44', appName: 'App4', version: '1.1', value: 'Value44', modifiedOn: new Date('2024-01-31') },
      { id: this.currentId++, key: 'setting45', appName: 'App5', version: '2.0', value: 'Value45', modifiedOn: new Date('2024-02-01') },
      { id: this.currentId++, key: 'setting46', appName: 'App1', version: '2.0', value: 'Value46', modifiedOn: new Date('2024-02-02') },
      { id: this.currentId++, key: 'setting47', appName: 'App2', version: '2.1', value: 'Value47', modifiedOn: new Date('2024-02-03') },
      { id: this.currentId++, key: 'setting48', appName: 'App3', version: '2.1', value: 'Value48', modifiedOn: new Date('2024-02-04') },
      { id: this.currentId++, key: 'setting49', appName: 'App4', version: '3.0', value: 'Value49', modifiedOn: new Date('2024-02-05') },
      { id: this.currentId++, key: 'setting50', appName: 'App5', version: '3.0', value: 'Value50', modifiedOn: new Date('2024-02-06') },
      { id: this.currentId++, key: 'setting51', appName: 'App1', version: '1.0', value: 'Value51', modifiedOn: new Date('2024-02-07') },
      { id: this.currentId++, key: 'setting52', appName: 'App2', version: '1.0', value: 'Value52', modifiedOn: new Date('2024-02-08') },
      { id: this.currentId++, key: 'setting53', appName: 'App3', version: '1.1', value: 'Value53', modifiedOn: new Date('2024-02-09') },
      { id: this.currentId++, key: 'setting54', appName: 'App4', version: '1.1', value: 'Value54', modifiedOn: new Date('2024-02-10') },
      { id: this.currentId++, key: 'setting55', appName: 'App5', version: '2.0', value: 'Value55', modifiedOn: new Date('2024-02-11') },
      { id: this.currentId++, key: 'setting56', appName: 'App1', version: '2.0', value: 'Value56', modifiedOn: new Date('2024-02-12') },
      { id: this.currentId++, key: 'setting57', appName: 'App2', version: '2.1', value: 'Value57', modifiedOn: new Date('2024-02-13') },
      { id: this.currentId++, key: 'setting58', appName: 'App3', version: '2.1', value: 'Value58', modifiedOn: new Date('2024-02-14') },
      { id: this.currentId++, key: 'setting59', appName: 'App4', version: '3.0', value: 'Value59', modifiedOn: new Date('2024-02-15') },
      { id: this.currentId++, key: 'setting60', appName: 'App5', version: '3.0', value: 'Value60', modifiedOn: new Date('2024-02-16') },
      { id: this.currentId++, key: 'setting61', appName: 'App1', version: '1.0', value: 'Value61', modifiedOn: new Date('2024-02-17') },
      { id: this.currentId++, key: 'setting62', appName: 'App2', version: '1.0', value: 'Value62', modifiedOn: new Date('2024-02-18') },
      { id: this.currentId++, key: 'setting63', appName: 'App3', version: '1.1', value: 'Value63', modifiedOn: new Date('2024-02-19') },
      { id: this.currentId++, key: 'setting64', appName: 'App4', version: '1.1', value: 'Value64', modifiedOn: new Date('2024-02-20') },
      { id: this.currentId++, key: 'setting65', appName: 'App5', version: '2.0', value: 'Value65', modifiedOn: new Date('2024-02-21') },
      { id: this.currentId++, key: 'setting66', appName: 'App1', version: '2.0', value: 'Value66', modifiedOn: new Date('2024-02-22') },
      { id: this.currentId++, key: 'setting67', appName: 'App2', version: '2.1', value: 'Value67', modifiedOn: new Date('2024-02-23') },
      { id: this.currentId++, key: 'setting68', appName: 'App3', version: '2.1', value: 'Value68', modifiedOn: new Date('2024-02-24') },
      { id: this.currentId++, key: 'setting69', appName: 'App4', version: '3.0', value: 'Value69', modifiedOn: new Date('2024-02-25') },
      { id: this.currentId++, key: 'setting70', appName: 'App5', version: '3.0', value: 'Value70', modifiedOn: new Date('2024-02-26') },
      { id: this.currentId++, key: 'setting71', appName: 'App1', version: '1.0', value: 'Value71', modifiedOn: new Date('2024-02-27') },
      { id: this.currentId++, key: 'setting72', appName: 'App2', version: '1.0', value: 'Value72', modifiedOn: new Date('2024-02-28') },
      { id: this.currentId++, key: 'setting73', appName: 'App3', version: '1.1', value: 'Value73', modifiedOn: new Date('2024-02-29') },
      { id: this.currentId++, key: 'setting74', appName: 'App4', version: '1.1', value: 'Value74', modifiedOn: new Date('2024-03-01') },
      { id: this.currentId++, key: 'setting75', appName: 'App5', version: '2.0', value: 'Value75', modifiedOn: new Date('2024-03-02') },
      { id: this.currentId++, key: 'setting76', appName: 'App1', version: '2.0', value: 'Value76', modifiedOn: new Date('2024-03-03') },
      { id: this.currentId++, key: 'setting77', appName: 'App2', version: '2.1', value: 'Value77', modifiedOn: new Date('2024-03-04') },
      { id: this.currentId++, key: 'setting78', appName: 'App3', version: '2.1', value: 'Value78', modifiedOn: new Date('2024-03-05') },
      { id: this.currentId++, key: 'setting79', appName: 'App4', version: '3.0', value: 'Value79', modifiedOn: new Date('2024-03-06') },
      { id: this.currentId++, key: 'setting80', appName: 'App5', version: '3.0', value: 'Value80', modifiedOn: new Date('2024-03-07') },
      { id: this.currentId++, key: 'setting81', appName: 'App1', version: '1.0', value: 'Value81', modifiedOn: new Date('2024-03-08') },
      { id: this.currentId++, key: 'setting82', appName: 'App2', version: '1.0', value: 'Value82', modifiedOn: new Date('2024-03-09') },
      { id: this.currentId++, key: 'setting83', appName: 'App3', version: '1.1', value: 'Value83', modifiedOn: new Date('2024-03-10') },
      { id: this.currentId++, key: 'setting84', appName: 'App4', version: '1.1', value: 'Value84', modifiedOn: new Date('2024-03-11') },
      { id: this.currentId++, key: 'setting85', appName: 'App5', version: '2.0', value: 'Value85', modifiedOn: new Date('2024-03-12') },
      { id: this.currentId++, key: 'setting86', appName: 'App1', version: '2.0', value: 'Value86', modifiedOn: new Date('2024-03-13') },
      { id: this.currentId++, key: 'setting87', appName: 'App2', version: '2.1', value: 'Value87', modifiedOn: new Date('2024-03-14') },
      { id: this.currentId++, key: 'setting88', appName: 'App3', version: '2.1', value: 'Value88', modifiedOn: new Date('2024-03-15') },
      { id: this.currentId++, key: 'setting89', appName: 'App4', version: '3.0', value: 'Value89', modifiedOn: new Date('2024-03-16') },
      { id: this.currentId++, key: 'setting90', appName: 'App5', version: '3.0', value: 'Value90', modifiedOn: new Date('2024-03-17') },
      { id: this.currentId++, key: 'setting91', appName: 'App1', version: '1.0', value: 'Value91', modifiedOn: new Date('2024-03-18') },
      { id: this.currentId++, key: 'setting92', appName: 'App2', version: '1.0', value: 'Value92', modifiedOn: new Date('2024-03-19') },
      { id: this.currentId++, key: 'setting93', appName: 'App3', version: '1.1', value: 'Value93', modifiedOn: new Date('2024-03-20') },
      { id: this.currentId++, key: 'setting94', appName: 'App4', version: '1.1', value: 'Value94', modifiedOn: new Date('2024-03-21') },
      { id: this.currentId++, key: 'setting95', appName: 'App5', version: '2.0', value: 'Value95', modifiedOn: new Date('2024-03-22') },
      { id: this.currentId++, key: 'setting96', appName: 'App1', version: '2.0', value: 'Value96', modifiedOn: new Date('2024-03-23') },
      { id: this.currentId++, key: 'setting97', appName: 'App2', version: '2.1', value: 'Value97', modifiedOn: new Date('2024-03-24') },
      { id: this.currentId++, key: 'setting98', appName: 'App3', version: '2.1', value: 'Value98', modifiedOn: new Date('2024-03-25') },
      { id: this.currentId++, key: 'setting99', appName: 'App4', version: '3.0', value: 'Value99', modifiedOn: new Date('2024-03-26') },
      { id: this.currentId++, key: 'setting100', appName: 'App5', version: '3.0', value: 'Value100', modifiedOn: new Date('2024-03-27') }
    ];
    this.settingsSubject.next(initialSettings);
  }

  getSettings(): Observable<ConfigSetting[]> {
    return this.settingsSubject.asObservable();
  }

  addSetting(setting: ConfigSetting): void {
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    const currentSettings = this.settingsSubject.getValue();
    const newSetting: ConfigSetting = {
      id: this.currentId++,
      key: setting.key,
      appName: setting.appName,
      version: setting.version,
      value: setting.value,
      modifiedOn: new Date(),
      modifiedBy: randomName
    };
    this.settingsSubject.next([...currentSettings, newSetting]);
  }

  editSetting(setting: ConfigSetting): void {
    const currentSettings = this.settingsSubject.getValue();
    const updatedSettings = currentSettings.map(s => s.id === setting.id ? setting : s);
    this.settingsSubject.next(updatedSettings);
  }

  deleteSetting(id: number): void {
    const currentSettings = this.settingsSubject.getValue();
    const updatedSettings = currentSettings.filter(s => s.id !== id);
    this.settingsSubject.next(updatedSettings);
  }
  
  checkDuplicate(key: string, version?: string): Observable<boolean> {
    return this.settingsSubject.asObservable().pipe(
      take(1),
      map(settings => settings.some(setting =>
        setting.key === key &&
        setting.version === version
      ))
    );
  }
}

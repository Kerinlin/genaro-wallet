import { Injectable, SimpleChange, ApplicationRef } from '@angular/core';
import { IpcService } from './ipc.service';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { SETTINGS } from "../libs/config";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private _showWallet: boolean = true;
  get showWallet() {
    return this._showWallet;
  }
  set showWallet(value) {
    this._showWallet = value;
    if (value !== null)
      this.update("showWallet");
  }

  private _showEden: boolean = true;
  get showEden() {
    return this._showEden;
  }
  set showEden(value) {
    this._showEden = value;
    if (value !== null)
      this.update("showEden");
  }

  private _showTxEden: boolean = true;
  get showTxEden() {
    return this._showTxEden;
  }
  set showTxEden(value) {
    this._showTxEden = value;
    if (value !== null)
      this.update("showTxEden");
  }

  private _showSharer: boolean = true;
  get showSharer() {
    return this._showSharer;
  }
  set showSharer(value) {
    this._showSharer = value;
    if (value !== null)
      this.update("showSharer");
  }

  private _showTxSharer: boolean = true;
  get showTxSharer() {
    return this._showTxSharer;
  }
  set showTxSharer(value) {
    this._showTxSharer = value;
    if (value !== null)
      this.update("showTxSharer");
  }

  private _lang: string = "en";
  get lang() {
    return this._lang;
  }
  set lang(value) {
    this._lang = value;
    this.i18n.use(value);
    this.update("lang");
  }


  constructor(
    private ipc: IpcService,
    private i18n: TranslateService,
  ) {
    let names = ["showWallet", "showEden", "showTxEden", "showSharer", "showTxSharer", "lang"];
    names.forEach(async name => {
      let value: any = await this.ipc.dbGet("setting", `SELECT value FROM setting WHERE name = '${name}'`);
      if (!SETTINGS[name][1])
        this[name] = SETTINGS[name][0];
      else if (value)
        this[name] = JSON.parse(value.value);
      else
        await this.ipc.dbRun("setting", `INSERT INTO setting (name, value) VALUES ('${name}', '${JSON.stringify(this[name])}')`);
    });
  }
  update(name) {
    this.ipc.dbRun("setting", `UPDATE setting SET value='${JSON.stringify(this[name])}' WHERE name='${name}'`);
  }
}

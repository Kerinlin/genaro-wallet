import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  wallets: any[] = [];

  currentAccount: string;
  blockHeight: number = null;

  constructor(
    private i18n: TranslateService,
    private web3: Web3Service,
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.currentAccount = this.i18n.instant("HEADER.NO_ACCOUNT");
      this.wallets = [];
    }, 0);
    this.web3.event.on("started", () => {
      this.web3.eth.subscribe("newBlockHeaders", (err, bh: any) => {
        if (err) return;
        bh = Object.assign({}, bh);
        this.blockHeight = bh.number;
        this.changeRef.detectChanges();
      });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
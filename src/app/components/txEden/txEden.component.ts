import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { TxEdenService } from '../../services/txEden.service';
import { TransactionService } from '../../services/transaction.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-txEden',
  templateUrl: './txEden.component.html',
  styleUrls: ['./txEden.component.scss']
})
export class TxEdenComponent implements OnInit, OnDestroy {

  constructor(
    private walletService: WalletService,
    private txService: TransactionService,
    public txEden: TxEdenService,
  ) {
    this.txEden.getAll();
  }

  spacePer: number = 0;
  trafficPer: number = 0;
  spaceUsed: number = 0;
  spaceAll: number = 0;
  trafficUsed: number = 0;
  trafficAll: number = 0;
  dialogName: string = null;
  tableChangeIndex: number = 0;

  walletSub: any;
  blockSub: any;
  ngOnInit() {
    this.txEdenUpdate();
    this.blockSub = this.walletService.currentWallet.subscribe(() => {
      this.txEdenUpdate();
    });
    this.walletSub = this.txService.newBlockHeaders.subscribe(() => {
      this.txEdenUpdate(false);
    });
  }

  async txEdenUpdate(force: boolean = true) {
    await this.txEden.getAll(force);
    let user = this.txEden.currentUser;
    let buckets = this.txEden.bucketList;
    let allSpace = 0;
    let usedSpace = 0;
    buckets.forEach(bucket => {
      allSpace += bucket.limitStorage;
      usedSpace += (bucket.usedSpaceStorage || 0);
    });
    this.spaceUsed = usedSpace;
    this.spaceAll = allSpace;
    this.trafficUsed = user.usedDownloadBytes || 0;
    this.trafficAll = user.limitBytes || 0;
    if (!allSpace) this.spacePer = 0;
    else this.spacePer = usedSpace * 100 / allSpace;
    if (!user.limitBytes) this.trafficPer = 0;
    else this.trafficPer = user.usedDownloadBytes * 100 / (user.limitBytes) || 0;
  }

  ngOnDestroy() {
    this.walletSub.unsubscribe();
    this.blockSub.unsubscribe();
  }



}

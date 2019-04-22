import { Component, OnInit } from '@angular/core';
import { WifiService } from 'src/service/wifi.service';
import { Subscription } from 'rxjs';
import { AnimationService } from 'src/service/animation.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private wifiService: WifiService,
    private animationService: AnimationService) { }
  public ssid: string;
  public password: string;
  public wifi: any;
  public wifiSub: Subscription;
  public spinner: Boolean = true;
  public spinnerSub: Subscription;
  public connection: Boolean = false;
  public connecting: Boolean = false;

  // this.ssid = "Finger weg da";
  // this.password = "24680fJhNsdawelobxYA0987AsDfGhBFE";

  ngOnInit() {
    this.spinnerSub = this.animationService
      .getSpinnerListener()
      .subscribe((spinner: Boolean) => {
        this.spinner = spinner;
      });

    this.scanWifi();
  }

  async sendCredentials() {
    this.connecting = true;
    await this.wifiService.sendCredentials(this.ssid, this.password);
    this.connecting = false;
  }

  checkESPNetwork() {
    return JSON.stringify(this.wifi).includes(`"SSID":"WaterMonitor"`);
  }

  async scanWifi() {
    this.wifiService.scanWifi().then(async () => {
      this.wifiSub = await this.wifiService
        .getWifiListener()
        .subscribe((wifi: any) => {
          this.wifi = wifi;
        });
    });
  }

  getSSID(ssid) {
    this.animationService.setSpinner(true);
    setTimeout(() => {
      this.animationService.setSpinner(false);
    }, 500)
    this.ssid = ssid;
  }

  unsetSSID() {
    this.ssid = undefined;
  }
}

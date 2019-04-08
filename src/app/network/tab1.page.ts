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
  public spinner: Boolean = false;
  public spinnerSub: Subscription;

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

  sendCredentials() {
    this.animationService.setSpinner(true);
    console.log("Passwort: " + this.password + " SSID: " + this.ssid);
    this.wifiService.sendCredentials(this.ssid, this.password)
  }

  async scanWifi() {
    this.animationService.setSpinner(true);
    setTimeout(() => {
      this.wifi = [{ SSID: "Finger weg da" }, { SSID: "WLANOTO" }, { SSID: "FRITZBOX", }];
      this.animationService.setSpinner(false);
    }, 1000)
    this.wifi = await this.wifiService.scanWifi().then(() => {
      this.animationService.setSpinner(false);
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

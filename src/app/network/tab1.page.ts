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
  public ssid;
  public password;
  public wifi = [{ SSID: "Finger weg da" }, { SSID: "WLANOTO" }, { SSID: "FRITZBOX", }];
  public spinner: Boolean = false;
  public spinnerSub: Subscription;

  ngOnInit() {
    this.spinnerSub = this.animationService
      .getSpinnerListener()
      .subscribe((spinner: Boolean) => {
        this.spinner = spinner;
      });
  }

  sendCredentials() {
    this.animationService.setSpinner(true);
    console.log("Password: " + this.password + " SSID: " + this.ssid);
    // this.ssid = "Finger weg da";
    // this.password = "24680fJhNsdawelobxYA0987AsDfGhBFE";
    this.wifiService.sendCredentials(this.ssid, this.password)
  }

  async scanWifi() {
    this.wifiService.scanWifi();
    setTimeout(() => {
      this.wifi = this.wifiService.networks;
    }, 500)
  }

  getSSID(ssid) {
    this.ssid = ssid;
  }

  unsetSSID() {
    this.ssid = undefined;
  }

}

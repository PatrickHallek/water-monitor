import { Component } from '@angular/core';
import { WifiService } from 'src/service/wifi.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private wifiService: WifiService) {}
  public ssid;
  public password;

  sendCredentials(){
    this.ssid = "Finger weg da";
    this.password = "24680fJhNsdawelobxYA0987AsDfGhBFE";
    this.wifiService.sendCredentials(this.ssid, this.password)
  }

  scanWifi(){
    this.wifiService.scanWifi();
  }

}

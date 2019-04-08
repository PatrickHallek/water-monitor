import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Hotspot, HotspotNetwork } from "@ionic-native/hotspot/ngx";
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: "root" })
export class WifiService {
  constructor(private http: HttpClient, private hotspot: Hotspot, private storage: Storage) { }

  getAppToken() {
    return new Promise(resolve => {
      this.storage.get('appToken').then((token) => {
        if (!token) {
          const appToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
          this.storage.set('appToken', appToken);
        }
        resolve(token);
      });
    });
  }

  scanWifi() {
    return new Promise(resolve => {
      this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
        resolve(networks);
      });
    });
  }

  async sendCredentials(ssid, password) {

    const appToken = await this.getAppToken();
    const url = "http://wifi.urremote.com/wifisave?s=" + ssid.split(' ').join('+') + "&p=" + password.split(' ').join('+') + "&blynk=" + appToken;
    this.hotspot
      .connectToWifi("WaterMonitor", "password")
      .then(() => {
        this.http.get(url).subscribe(msg => {
          console.log("Credentials saved");
          setTimeout(() => {
            this.http.get("http://wifi.urremote.com/close?");
            console.log("Close Controller WIFI");
          }, 5000)
        });

        this.hotspot
          .connectToWifi(ssid, password)
          .then(() => {
            console.log("successfull logged back into WIFI");
          })
          .catch(() => {
            console.log("error while relogging in WIFI");
          });
      })
      .catch(() => {
        console.log("Could not find Controller WIFI");
      });
  }
}
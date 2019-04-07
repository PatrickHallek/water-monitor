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
    this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
      console.log(networks);
    });
  }

  async sendCredentials(ssid, password) {
    const appToken = await this.getAppToken();
    const url = "http://wifi.urremote.com/wifisave?s=" + ssid.split(' ').join('+') + "&p=" + password.split(' ').join('+') + "&blynk=" + appToken;
    console.log(url);

    // this.http.get("http://wifi.urremote.com/wifisave?s=Finger+weg+da&p=24680fJhNsdawelobxYA0987AsDfGhBFE&blynk=AppToken").subscribe(() => {
    //   setTimeout(() => {
    //     this.http.get("http://wifi.urremote.com/close?");
    //   }, 5000)
    // });

    //   this.hotspot
    //     .connectToWifi("Water Monitor", "admin")
    //     .then(() => {
    //       console.log("successfully logged in ESP8266");
    //       const url = "http://wifi.urremote.com/wifisave?s=" + ssid + "&p=" + password;
    //       this.http.get("http://wifi.urremote.com/wifisave?s=Finger+weg+da&p=24680fJhNsdawelobxYA0987AsDfGhBFE");

    //       this.hotspot
    //         .connectToWifi(ssid, password)
    //         .then(() => {
    //           console.log("successfull logged back into WIFI");
    //         })
    //         .catch(() => {
    //           console.log("error while relogging in WIFI");
    //         });
    //     })
    //     .catch(() => {
    //       console.log("error while logging into ESP8266");
    //     });
    // }
  }
}
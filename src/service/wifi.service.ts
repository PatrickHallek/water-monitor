import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Hotspot, HotspotNetwork } from "@ionic-native/hotspot/ngx";
import { Storage } from '@ionic/storage';
import { Subject, timer } from 'rxjs';
import { AnimationService } from './animation.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/internal/operators';

@Injectable({ providedIn: "root" })
export class WifiService {
  public networks: any;
  private wifi = new Subject();
  constructor(private http: HttpClient, private hotspot: Hotspot, private storage: Storage, private animationService: AnimationService, private router: Router) { }

  getWifiListener() {
    return this.wifi.asObservable();
  }

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

  setAppToken(token: String) {
    this.storage.set('appToken', token);
  }

  async scanWifi() {
    this.animationService.setSpinner(true);
    this.hotspot.scanWifi().then(async (networks: HotspotNetwork[]) => {
      console.log(networks);
      await this.timer(1000);
      this.animationService.setSpinner(false);
      if (!networks) {
        this.animationService.setSpinner(false);
        return;
      } else if (!networks.length) {
        this.animationService.setSpinner(false);
        return;
      }
      this.wifi.next(networks);
      return;
    }).catch(async err => {
      await this.timer(1000);
      this.animationService.setSpinner(false);
      this.wifi.next([{ SSID: "Finger weg da" }, { SSID: "WaterMonitor" }, { SSID: "WLANOTO" }, { SSID: "FRITZBOX", }]);
    });
  }

  async sendCredentials(ssid, password) {
    this.animationService.setSpinner(true);
    console.log("Start sending credentials");
    const appToken = await this.getAppToken();
    const url = "http://192.168.169.69/text?token=" + appToken + "&ssid=" + ssid + "&password=" + password;
    // this.connectionToESP();
    // await timer(2000);
    if (await this.sendCredentialsESP(url) === true) {
      await this.timer(10000);
      this.checkConnectionESP();
    }
  }

  private connectionToESP() {
    console.log("Connecting...");
    return new Promise(resolve => {
      this.hotspot.connectToWifi("WaterMonitor", "admin1234").then(async (res) => {
        resolve(true);
      }).catch(async (err) => {
        await this.timer(2000);
        resolve(true);
      });
    });
  }

  private sendCredentialsESP(url: string) {
    console.log("Send Credentials...");
    new HttpHeaders().set('Content-Type', 'text; charset=utf-8');
    return new Promise(resolve => {
      this.http.get(url).subscribe(async (res: any) => {
        console.log(res.message);
        if (res.message === "Credentials received") {
          resolve(true);
        } else {
          resolve(false);
          this.animationService.setMessage("Es konnte keine Verbindung zum Empfänger hergestellt werden. Falls der Empfänger bereits eingeschaltet ist, schalten Sie diesen aus und wieder ein.", false, 6000);
          this.animationService.setSpinner(false);
          this.router.navigateByUrl('/tabs/network');
        }
      }, err => {
        this.animationService.setMessage("Es konnte keine Verbindung zum Empfänger hergestellt werden. Vergwissere dich, dass du im Empfänger Netwerk eingeloggt bist.", false, 4000);
        this.animationService.setSpinner(false);
        this.router.navigateByUrl('/tabs/network');
      });
    });
  }

  private checkConnectionESP() {
    console.log("Check connection form ESP...");
    new HttpHeaders().set('Content-Type', 'text; charset=utf-8');
    return new Promise(async resolve => {
      this.http.get("http://192.168.169.69/status").pipe(timeout(15000)).subscribe((status: any) => {
        console.log(status);
        if (status.message === "1") {
          resolve(true);
          this.animationService.setSpinner(false);
          this.router.navigateByUrl('/tabs/overview');
          this.animationService.setMessage("Erfolgreich mit dem Empfänger verbunden! Falls du noch keine Daten siehst, versichere dich die Sensoren angestellt zu haben und starte die App neu.", true, 6000);
        } else if (status.message === "0") {
          resolve(false);
          this.animationService.setMessage("Falsches WLAN Passwort.", false, 2500);
          this.animationService.setSpinner(false);
          this.router.navigateByUrl('/tabs/network');
        } else {
          resolve(false);
          this.animationService.setMessage("Etwas ist schief gelaufen, bitte versuche es erneut.", false, 2500);
          this.animationService.setSpinner(false);
          this.router.navigateByUrl('/tabs/network');
        }
      });
    });
  }

  private timer(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
}

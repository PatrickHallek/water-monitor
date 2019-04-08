import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ISensor } from "../models/monitor.model";
import { WifiService } from './wifi.service';

@Injectable({ providedIn: "root" })
export class RestService {

  private sensor: ISensor[];
  private sensorUpdated = new Subject<ISensor[]>();
  private waterLevel;
  private waterLevelUpdated = new Subject<ISensor[]>();
  private user;

  constructor(private http: HttpClient, private wifiService: WifiService) {}


  getSensorDataListener() {
    return this.sensorUpdated.asObservable();
  }
  getWaterLevelListener() {
    return this.waterLevelUpdated.asObservable();
  }
  saveInputToDatabase(sensorData) {
    this.http
      .post("http://192.168.188.22:3000/update", sensorData)
      .subscribe(() => { }, err => console.error(err));
  }
  async getSensorData() {
    this.user = await this.wifiService.getAppToken();
    this.http
      .get<ISensor[]>("http://192.168.188.22:3000/" + this.user)
      .pipe(
        map(data => {
          return data.map(sensor => {
            const sensorUpdate: ISensor = {
              image: sensor.image,
              sensorName: sensor.sensorName,
              timestamp: sensor.timestamp,
              waterLevel: sensor.waterLevel,
              room: sensor.room,
              duration: sensor.duration
            };
            return sensorUpdate;
          });
        })
      )
      .subscribe((sensor: ISensor[]) => {
        this.sensor = sensor;
        this.sensorUpdated.next(this.sensor);
      });
  }
  getWaterLevel() {
    this.http
      .get<ISensor[]>("http://192.168.188.22:3000/" + this.user)
      .pipe(
        map(data => {
          return data.map(sensor => {
            const waterLevel = {
              waterLevel: sensor.waterLevel
            };
            return waterLevel;
          });
        })
      )
      .subscribe(waterLevel => {
        this.waterLevel = waterLevel;
        this.waterLevelUpdated.next(this.waterLevel);
      });
  }

  async updateSensor(sensor) {
    const postData = {
      room: sensor.room,
      duration: sensor.duration,
      sensorName: sensor.sensorName,
      image: sensor.image,
      user: await this.wifiService.getAppToken()
    };
    this.http.post("http://192.168.188.22:3000/update", postData).subscribe(err => {
      this.getSensorData();
    });
  }
}

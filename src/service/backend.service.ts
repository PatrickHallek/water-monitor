import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ISensor } from "../models/monitor.model";
import { WifiService } from './wifi.service';

@Injectable({ providedIn: "root" })
export class BackendService {

  private sensor: ISensor[];
  private sensorUpdated = new Subject<ISensor[]>();
  private waterLevel;
  private waterLevelUpdated = new Subject<ISensor[]>();
  private user;
  private timeToInactive = 60 * 1000  ;

  constructor(private http: HttpClient, private wifiService: WifiService) {
  }


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
    console.log(await this.wifiService.getAppToken());
    this.http
      .get<ISensor[]>("http://192.168.188.22:3000/" + this.user)
      .pipe(
        map(data => {
          return data.map(sensor => {
            if (!sensor.sensorName) {
              sensor.sensorName = "Pflanze";
            }
            if (!sensor.image) {
              sensor.image = "https://coachhouseplants.com/wp-content/uploads/2016/12/iStock-504044372.jpg";
            }
            const timeDifference = Date.now() - new Date(sensor.timestamp).getTime();
            if (timeDifference < this.timeToInactive) {
              sensor.active = true;
            } else {
              sensor.active = false;
            }
            const sensorUpdate: ISensor = {
              sensorNumber: sensor.sensorNumber,
              image: sensor.image,
              sensorName: sensor.sensorName,
              timestamp: sensor.timestamp,
              waterLevel: sensor.waterLevel,
              room: sensor.room,
              duration: sensor.duration,
              active: sensor.active
            };
            return sensorUpdate;
          });
        })
      )
      .subscribe((sensor: ISensor[]) => {
        if (!sensor) {
          return
        }
        else if (!sensor.length) {
          return
        }
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
    console.log(sensor);
    const postData = {
      sensorNumber: sensor.sensorNumber,
      room: sensor.room,
      duration: sensor.duration,
      sensorName: sensor.sensorName,
      image: sensor.image,
      appToken: await this.wifiService.getAppToken()
    };
    this.http.post("http://192.168.188.22:3000/update", postData).subscribe(err => {
      this.getSensorData();
    });
  }

  async deleteSensor(sensorNumber) {
    console.log(sensorNumber);
    const postData = {
      sensorNumber: sensorNumber,
      appToken: await this.wifiService.getAppToken()
    };
    this.http.post("http://192.168.188.22:3000/delete", postData).subscribe(err => {
      this.getSensorData();
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestService } from "src/service/data-stream.service";
import { Subscription } from "rxjs";
import { Modal2Component } from "./modal2/modal2.component";
import { ModalController } from "@ionic/angular";
import { ISensor } from "../../models/monitor.model";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  constructor(
    private http: HttpClient,
    private restService: RestService,
    public modalController: ModalController
  ) {}
  sensors = [];
  barWidth = "90%";
  public sensorDataSub: Subscription;
  public waterLevelSub: Subscription;
  public sensorData: ISensor[];

  ngOnInit() {
    this.restService.getSensorData();
    setInterval(() => {
      this.restService.getWaterLevel();
    }, 15500);
    this.sensorDataSub = this.restService
      .getSensorDataListener()
      .subscribe(sensorData => {
        this.sensorData = sensorData;
      });

    this.waterLevelSub = this.restService
      .getWaterLevelListener()
      .subscribe(waterLevel => {
        for (let i = 0; i < this.sensorData.length; i++) {
          this.sensorData[i].waterLevel = waterLevel[i].waterLevel;
        }
      });
  }

  async presentModal(i) {
    const modal = await this.modalController.create({
      component: Modal2Component,
      componentProps: { sensor: this.sensorData[i] }
    });
    return await modal.present();
  }
}

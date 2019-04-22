import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "src/service/backend.service";
import { Subscription } from "rxjs";
import { Modal2Component } from "./modal2/modal2.component";
import { ModalController, NavController } from "@ionic/angular";
import { ISensor } from "../../models/monitor.model";
import { Tab1Page } from '../network/tab1.page';
import { Router } from '@angular/router';
import { AnimationService } from 'src/service/animation.service';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  constructor(
    private http: HttpClient,
    private restService: BackendService,
    public animationService: AnimationService,
    public modalController: ModalController,
    public navCtrl: NavController,
    public router: Router,
  ) { }
  sensors = [];
  barWidth = "90%";
  public sensorDataSub: Subscription;
  public waterLevelSub: Subscription;
  public messageSub: Subscription;
  public message: { msg: String, state: Boolean };
  public sensorData: ISensor[];

  ngOnInit() {
    this.restService.getSensorData();
    // setInterval(() => {
    //   this.restService.getWaterLevel();
    // }, 100000);
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

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  refresh() {
    this.restService.getSensorData();
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISensor } from "src/models/monitor.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PhotoService } from 'src/service/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BackendService } from 'src/service/backend.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: "app-modal2",
  templateUrl: "./modal2.component.html",
  styleUrls: ["./modal2.component.scss"]
})
export class Modal2Component implements OnInit {
  @Input() sensor: ISensor;
  public slideOneForm: FormGroup;
  public myPhoto: any;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public photoService: PhotoService,
    private camera: Camera,
    private restService: BackendService,
    private webview: WebView
  ) { }

  updateSensor() {
    this.restService.updateSensor(this.sensor).then(() => {
      this.closeModal();
    });
  }

  deleteSensor() {
    this.restService.deleteSensor(this.sensor.sensorNumber).then(() => {
      this.closeModal();
    });
  }

  ngOnInit() {
    console.log(this.camera.DestinationType.FILE_URI)
  }

  async takePhoto(i): Promise<any> {
    let sourceType = this.camera.PictureSourceType.CAMERA;
    if (i === 1) {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourceType,
      correctOrientation: true,
      mediaType: this.camera.
        MediaType.PICTURE
    }

    this.sensor.image = this.webview.convertFileSrc(await this.camera.getPicture(options));
    // Add new photo to gallery
    // this.sensor.image = 'data:image/jpeg;base64,' + imageData;
    // this.storage.set('photos', this.photos);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

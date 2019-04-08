import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISensor } from "src/models/monitor.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PhotoService } from 'src/service/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RestService } from 'src/service/data-stream.service';

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
    private restService: RestService
  ) { }

  updateSensor() {
    this.restService.updateSensor(this.sensor).then(() => {
      this.closeModal();
    });
  }

  ngOnInit() {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.
        MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)
      // Add new photo to gallery
      this.sensor.image = 'data:image/jpeg;base64,' + imageData;
      // this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

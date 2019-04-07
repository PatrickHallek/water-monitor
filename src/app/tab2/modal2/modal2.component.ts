import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISensor } from "src/app/models/monitor.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-modal2",
  templateUrl: "./modal2.component.html",
  styleUrls: ["./modal2.component.scss"]
})
export class Modal2Component implements OnInit {
  @Input() sensor: ISensor;
  public slideOneForm: FormGroup;
  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.slideOneForm = formBuilder.group({
      firstName: [""],
      lastName: [""],
      age: [""]
    });
  }

  ngOnInit() {
    console.log(this.sensor);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { Modal2Component } from "./modal2/modal2.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab2Page }])
  ],
  declarations: [Tab2Page, Modal2Component],
  entryComponents: [Modal2Component]
})
export class Tab2PageModule {}

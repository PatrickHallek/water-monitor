import { Component } from "@angular/core";
import { WifiService } from "src/service/wifi.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  constructor(private wifiService: WifiService) {}
}

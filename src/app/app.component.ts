import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AnimationService } from 'src/service/animation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private animationService: AnimationService,
  ) {
    this.initializeApp();
  }
  public messageSub: Subscription;
  public messageState: Boolean;
  public message: String;


  ngOnInit() {
    this.messageSub = this.animationService
      .getMessageListener()
      .subscribe((message: { msg: String; state: Boolean; }) => {
        this.message = message.msg;
        this.messageState = message.state;
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

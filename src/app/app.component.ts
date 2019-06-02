import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AnimationService } from 'src/service/animation.service';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    private animationService: AnimationService,
    private notificationService: NotificationService
  ) {
    this.initializeApp();
    this.backgroundMode.enable();
  }
  public messageSub: Subscription;
  public messageState: Boolean;
  public message: String;
  public counter = 0;


  ngOnInit() {
    setInterval(() => {
      this.counter++;
      this.notificationService.submit("Counter steht bei:" + this.counter);
      console.log(this.counter);
    }, 2000)
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

import { Injectable } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Injectable({ providedIn: "root" })
export class NotificationService {
    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        public localNotifications: LocalNotifications,
        public alertCtrl: AlertController,
    ) { }

    submit(text) {
        this.localNotifications.schedule({
            id: 1,
            text: text,
            sound: this.setSound(),
            icon: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png'
        });
    }
    setSound() {
        if (this.platform.is('android')) {
            return 'file://assets/sounds/Rooster.mp3'
        } else {
            return 'file://assets/sounds/Rooster.caf'
        }
    }
}

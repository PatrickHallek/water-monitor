import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

class Photo {
    data: any;
}

@Injectable({ providedIn: "root" })
export class PhotoService {
    public photos: Photo[] = [];
    constructor(public http: HttpClient, private camera: Camera, public photoService: PhotoService) {}

    takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
            // Add new photo to gallery
            this.photos.unshift({
                data: 'data:image/jpeg;base64,' + imageData
            });
        }, (err) => {
            // Handle error
            console.log("Camera issue: " + err);
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

class Photo {
    data: any;
}

@Injectable({ providedIn: "root" })
export class PhotoService {
    public photos: Photo[] = [];
    constructor(private imagePicker: ImagePicker, public http: HttpClient, private camera: Camera, public photoService: PhotoService, private photoLibrary: PhotoLibrary) { }

    public options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.
        MediaType.PICTURE
    }

    showPhoto() {
        this.photoLibrary.requestAuthorization().then(() => {
            this.photoLibrary.getLibrary().subscribe({
                next: library => {
                    library.forEach(function (libraryItem) {
                        console.log(libraryItem.id);          // ID of the photo
                        console.log(libraryItem.photoURL);    // Cross-platform access to photo
                        console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
                        console.log(libraryItem.fileName);
                        console.log(libraryItem.width);
                        console.log(libraryItem.height);
                        console.log(libraryItem.creationDate);
                        console.log(libraryItem.latitude);
                        console.log(libraryItem.longitude);
                        console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
                    });
                },
                error: err => { console.log('could not get photos'); },
                complete: () => { console.log('done getting photos'); }
            });
        })
            .catch(err => console.log('permissions weren\'t granted'));
    }

    takePhoto() {
        this.imagePicker.getPictures(this.options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { });
    }

    takePhoto2() {
        this.camera.getPicture(this.options).then((imageData) => {
            console.log(imageData)
            // Add new photo to gallery
            this.photos.unshift({
                data: 'data:image/jpeg;base64,' + imageData
            });
            // this.storage.set('photos', this.photos);
        }, (err) => {
            // Handle error
            console.log("Camera issue: " + err);
        });
    }
}

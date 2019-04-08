import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AnimationService {
    constructor(private http: HttpClient) { }
    private spinner = new Subject();

    getSpinnerListener() {
        return this.spinner.asObservable();
    }
    setSpinner(bool) {
        this.spinner.next(bool);
    }
}

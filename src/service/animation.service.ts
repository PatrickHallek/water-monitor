import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AnimationService {
    constructor(private http: HttpClient) { }
    private spinner = new Subject();
    private msg = new Subject();

    getSpinnerListener() {
        return this.spinner.asObservable();
    }
    setSpinner(bool: Boolean) {
        this.spinner.next(bool);
    }
    getMessageListener() {
        return this.msg.asObservable();
    }
    setMessage(msg: String, state: Boolean, time: number) {
        this.msg.next({ msg: msg, state: state });
        setTimeout(() => {
            this.msg.next({msg: undefined, state: undefined});
        }, time);
    }

}

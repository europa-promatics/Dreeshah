import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  private subject = new Subject<any>();

    sendProfileImg(image) {
        console.log('---mess',image)
        this.subject.next(image);
    }

    getProfileImg(): Observable<any> {
        return this.subject.asObservable();
    }
}

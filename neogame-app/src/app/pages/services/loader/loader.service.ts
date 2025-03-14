import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private count = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  showLoader() {
    if (this.count === 0) {
      this.isLoadingSubject.next(true);
    }
    this.count++;
  }

  hideLoader() {
    this.count--;
    if (this.count === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}

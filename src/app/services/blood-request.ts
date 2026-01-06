import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class BloodRequest {
  private requestsSource = new BehaviorSubject<any[]>([]);
  requests$ = this.requestsSource.asObservable();

  constructor(private storage: StorageService) {
    this.refreshRequests();
  }

  getAllRequestsSync() {
    return this.storage.getRequests();
  }

  refreshRequests() {
    const reqs = this.storage.getRequests();
    this.requestsSource.next(reqs);
  }

  addRequest(req: any) {
    const newReq = this.storage.addRequest(req);
    this.refreshRequests();
    return of(newReq);
  }

  updateRequest(updatedReq: any) {
    this.storage.updateRequest(updatedReq);
    this.refreshRequests();
    return of(updatedReq);
  }

  deleteRequest(id: any) {
    this.storage.deleteRequest(id);
    this.refreshRequests();
    return of(true);
  }
}

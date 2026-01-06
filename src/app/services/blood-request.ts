import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, interval, switchMap, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BloodRequest {
  private apiUrl = 'http://localhost:5000/requests';
  private requestsSource = new BehaviorSubject<any[]>([]);
  requests$ = this.requestsSource.asObservable();

  constructor(private http: HttpClient) {
    // Poll every 5 seconds to simulate real-time updates across multiple tabs/browsers
    interval(5000).pipe(
      startWith(0),
      switchMap(() => this.http.get<any[]>(this.apiUrl))
    ).subscribe(reqs => {
      this.requestsSource.next(reqs);
    });
  }

  getAllRequestsSync() {
    return this.requestsSource.value;
  }

  refreshRequests() {
    this.http.get<any[]>(this.apiUrl).subscribe(reqs => {
      this.requestsSource.next(reqs);
    });
  }

  addRequest(req: any) {
    return this.http.post(this.apiUrl, req).pipe(
      tap(() => this.refreshRequests())
    );
  }

  updateRequest(updatedReq: any) {
    return this.http.put(`${this.apiUrl}/${updatedReq.id}`, updatedReq).pipe(
      tap(() => this.refreshRequests())
    );
  }

  deleteRequest(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshRequests())
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

  // --- Hospital Request Management ---
  private requestUrl = 'http://localhost:5000/requests';

  getRequests() {
    return this.http.get<any[]>(this.requestUrl);
  }

  addRequest(request: any) {
    return this.http.post(this.requestUrl, request);
  }

  updateRequest(request: any) {
    return this.http.put(`${this.requestUrl}/${request.id}`, request);
  }
}

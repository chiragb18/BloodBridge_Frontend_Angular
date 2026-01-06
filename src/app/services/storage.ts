import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private USERS_KEY = 'users';
  private REQUESTS_KEY = 'requests';

  constructor() {
    this.initData();
  }

  private initData() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.REQUESTS_KEY)) {
      localStorage.setItem(this.REQUESTS_KEY, JSON.stringify([]));
    }
  }

  // --- Users ---
  getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  addUser(user: any): boolean {
    const users = this.getUsers();

    const exists = users.find((u: any) => u.email === user.email);
    if (exists) {
      return false; // email already exists
    }

    const newUser = { ...user, id: user.id || Math.random().toString(36).substr(2, 9) };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  updateUser(updatedUser: any) {
    let users = this.getUsers();
    users = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Login
  login(email: string, password: string): any | null {
    const users = this.getUsers();
    return users.find(
      (u: any) => u.email === email && u.password === password
    ) || null;
  }

  // Logout
  logout() {
    localStorage.removeItem('loggedInUser');
  }

  // Save logged-in user
  setLoggedInUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  // Get logged-in user
  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  // --- Requests ---
  getRequests(): any[] {
    const requests = localStorage.getItem(this.REQUESTS_KEY);
    return requests ? JSON.parse(requests) : [];
  }

  saveRequests(requests: any[]) {
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests));
  }

  addRequest(request: any) {
    const requests = this.getRequests();
    const newRequest = { ...request, id: request.id || Date.now().toString() };
    requests.push(newRequest);
    this.saveRequests(requests);
    return newRequest;
  }

  updateRequest(updatedReq: any) {
    let requests = this.getRequests();
    requests = requests.map(r => r.id === updatedReq.id ? updatedReq : r);
    this.saveRequests(requests);
  }

  deleteRequest(id: any) {
    let requests = this.getRequests();
    requests = requests.filter(r => r.id !== id);
    this.saveRequests(requests);
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class StorageService {

//   getUsers() {
//     return JSON.parse(localStorage.getItem('users') || '[]');
//   }

//   saveUsers(users: any[]) {
//     localStorage.setItem('users', JSON.stringify(users));
//   }

//   saveLoggedUser(user: any) {
//     localStorage.setItem('loggedUser', JSON.stringify(user));
//   }

//   getLoggedUser() {
//     return JSON.parse(localStorage.getItem('loggedUser') || 'null');
//   }
// }

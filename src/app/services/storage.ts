import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private USERS_KEY = 'users';

  constructor() {}

  // Get all users
  getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save user (register)
  addUser(user: any): boolean {
    const users = this.getUsers();

    const exists = users.find((u: any) => u.email === user.email);
    if (exists) {
      return false; // email already exists
    }

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
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

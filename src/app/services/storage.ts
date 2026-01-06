import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  saveUsers(users: any[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  saveLoggedUser(user: any) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private storage: StorageService) { }

  registerUser(user: any) {
    const success = this.storage.addUser(user);
    return of(success);
  }

  getUsers() {
    return of(this.storage.getUsers());
  }

  login(email: string, password: string) {
    const user = this.storage.login(email, password);
    return of(user ? [user] : []);
  }

  getUserByEmail(email: string) {
    const users = this.storage.getUsers();
    const user = users.find(u => u.email === email);
    return of(user ? [user] : []);
  }

  updateUser(user: any) {
    this.storage.updateUser(user);
    return of(user);
  }
}
